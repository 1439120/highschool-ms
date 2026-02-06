using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Account;
using System.Net;
using HighSchoolManagementApi.Interfaces;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController: ControllerBase
    {
        private readonly UserManager<AuthUser> _userManager;
        private readonly ITokenService _tokenService;
        public AccountController(UserManager<AuthUser> userManager,  ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);

                var authUser = new AuthUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                var createUser = await _userManager.CreateAsync(authUser, registerDto.Password);
                if (createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(authUser, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                UserName = authUser.UserName,
                                Email = authUser.Email,
                                Token = _tokenService.CreateToken(authUser),
                            }
                        );
                    }else return StatusCode(500, roleResult.Errors);
                }

                return StatusCode(500, createUser.Errors);
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}