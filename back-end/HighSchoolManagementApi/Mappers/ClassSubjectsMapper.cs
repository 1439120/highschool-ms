using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.ClassSubjects;

namespace HighSchoolManagementApi.Mappers
{
    public static class ClassSubjectsMapper
    {
        public static ClassSubjects? FromDtoToClassSUbject(this ClassSubjectsDto dto)
        {
            if(dto == null) return null;

            return new ClassSubjects{
                ClassId = dto.ClassId,
                SubjectId = dto.SubjectId
            };
        }
    }
}