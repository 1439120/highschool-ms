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
        public static UsersDto? ToUsersDto(this Users usersModel)
        {
            if(usersModel == null) return null;
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
                Title = usersModel.Title,
                Type = usersModel.Type,
                LearnerClassroomId = usersModel.LearnerClassroomId
            };
        }

        public static Users ToUsersFromCreateDTO(this CreateUsersRequestDto createDto)
        {
            return new Users
            {
                Name = createDto.Name,
                Surname = createDto.Surname,
                Phone = createDto.Phone,
                Email = createDto.Email,
                Role = createDto.Role,
                Title = createDto.Title,
                Address = createDto.Address,
                DateOfBirth = createDto.DateOfBirth,
                DateJoined = createDto.DateJoined,
                Type = createDto.Type
            };
        }
    }
}