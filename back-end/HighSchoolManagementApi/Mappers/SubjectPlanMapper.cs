using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Dtos.SubjectPlan;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Mappers
{
    public static class SubjectPlanMapper
    {
        public static SubjectPlan FromAddDtoToSubjectPlan(this AddSubjectPlanDto createDto)
        {
            return new SubjectPlan
            {
                Name = createDto.Name,
                SubjectId = createDto.SubjectId,
                CreatedById = createDto.CreatedById,
                GradeId = createDto.GradeId,
            };
        }

        public static SubjectPlanDto ToLessonPlanDto(this SubjectPlan subjectPlanModel)
        {
            return new SubjectPlanDto
            {
                Id = subjectPlanModel.Id,
                Name = subjectPlanModel.Name,
                Subject = subjectPlanModel.Subject?.ToSubjectsDTO(),
                CreatedBy = subjectPlanModel.CreatedBy?.ToUserDto(),
                Grade = subjectPlanModel.Grade?.ToGradesDto(),
                CreatedOn = subjectPlanModel.CreatedOn,
                LastUpdatedOn = subjectPlanModel.LastUpdatedOn,
            };
        }
    }
}