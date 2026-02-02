using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Grades;

namespace HighSchoolManagementApi.Mappers
{
    public static class GradesMapper
    {
        public static Grades ToGradesFromCreateDto(this CreateGradesDto createDto)
        {
             return new Grades
            {
                Name = createDto.Name,
                GradeNumber = createDto.GradeNumber,
                CreatedOn = createDto.CreatedOn
            };
        }
    }
}