using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace HighSchoolManagementApi.Service
{
    public class TokenService: ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config) // pulls staff from the appsettings.json
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
        }

        public string CreateToken(AuthUser user)
        {
            var claims = new List<Claim>
            {
              new Claim(ClaimTypes.NameIdentifier, user.Id),   
              new Claim(JwtRegisteredClaimNames.Email, user.Email),  
              new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),  
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"],
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor); // object representation of the token
            return tokenHandler.WriteToken(token); // We want to return the token as a string not the token object
        }
    }
}