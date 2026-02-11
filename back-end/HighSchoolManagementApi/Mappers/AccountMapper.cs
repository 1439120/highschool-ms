using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Account;

namespace HighSchoolManagementApi.Mappers
{
    public static class AccountMapper
    {
        public static UserDto ToUserDto(this AuthUser auhtUser)
        {
            return new UserDto
            {
                UserName = auhtUser.UserName,
                Email = auhtUser.Email
            };
        }
    }
}