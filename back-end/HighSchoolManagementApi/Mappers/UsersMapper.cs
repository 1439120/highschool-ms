using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Users;

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
    }
}