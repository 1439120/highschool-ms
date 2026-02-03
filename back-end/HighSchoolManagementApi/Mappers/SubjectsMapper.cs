using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Dtos.Subjects;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Mappers
{
    public static class SubjectsMapper
    {
        public static Subjects ToSubjectsFromCreateDTO(this CreateSubjectsDto subjectDto)
        {
            return new Subjects
            {
                Name = subjectDto.Name,
                GradeId = subjectDto.GradeId,
                CreatedOn = subjectDto.CreatedOn
            };
        }

        public static SubjectsDto ToSubjectsDTO(this Subjects subjectModel)
        {
            return new SubjectsDto
            {
                Id = subjectModel.Id,
                Name = subjectModel.Name,
                GradeId = subjectModel.GradeId,
            };
        }
    }
}