using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Users;
using System.Reflection.Metadata.Ecma335;

namespace HighSchoolManagementApi.Mappers
{
    public static class UsersMapper
    {
        public static UsersDto ToUsersDto(this Users usersModel)
        {
            return new UsersDto
            {
                Id = usersModel.Id,
                Name = usersModel.Name,
                Surname = usersModel.Surname,
                Phone = usersModel.Phone,
                Email = usersModel.Email,
                Address = usersModel.Address,
                DateOfBirth = usersModel.DateOfBirth,
                DateJoined = usersModel.DateJoined,
                Role = usersModel.Role,
                Type = usersModel.Type
            };
        }

        public static Users ToUsersFromCreateDTO(this CreateUsersRequestDto stockDto)
        {
            return new Users
            {
                Name = stockDto.Name,
                Surname = stockDto.Surname,
                Phone = stockDto.Phone,
                Email = stockDto.Email,
                Role = stockDto.Role,
                Address = stockDto.Address,
                DateOfBirth = stockDto.DateOfBirth,
                DateJoined = stockDto.DateJoined,
                Type = stockDto.Type,
                CreatedOn = stockDto.CreatedOn
            };
        }
    }
}