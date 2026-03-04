using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Dtos.UserSubjects;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Mappers
{
    public static class UserAssignedSubjectMapper
    {
        public static UserAssignedSubjects FromDtoToAssignedSubjects(this UserAssignedSubjectDto userDto)
        {
            return new UserAssignedSubjects
            {
                UserId = userDto.UserId,
                ClassId = userDto.ClassId,
                SubjectId = userDto.SubjectId,
            };
        }
    }
}