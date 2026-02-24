using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Dtos.UserClasses;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Mappers
{
    public static class UserClassesMapper
    {
        public static UserClasses? FromCreateDtoToUserClasses(this UserClassesCreateDto createDto)
        {
            if(createDto == null) return null;
            return new UserClasses
            {
                UsersId = createDto.UsersId,
                ClassId = createDto.ClassId,
            };
        }

        public static UserClassesDto? ToUserClassesDto(this UserClasses userClassModel)
        {
            if(userClassModel == null) return null;
            return new UserClassesDto
            {
                UsersId = userClassModel.UsersId,
                Class = userClassModel.Class.ToClassroomDto(),
            };
        }
    }
}