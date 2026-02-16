using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.LessonPlan;

namespace HighSchoolManagementApi.Mappers
{
    public static class LessonPlanMapper
    {
        public static LessonPlan FromAddDtoToLessonPlan(this AddLessonPlanDto createDto)
        {
            return new LessonPlan
            {
                Name = createDto.Name,
                SubjectsId = createDto.SubjectsId,
                ResponsibleId = createDto.ResponsibleId,
                GradesId = createDto.GradesId,
            };
        }

        public static LessonPlanDto? ToLessonPlanDto(this LessonPlan lessonPlanModel)
        {
            if(lessonPlanModel == null) return null;
            return new LessonPlanDto
            {
                Id = lessonPlanModel.Id,
                Name = lessonPlanModel.Name,
                Subjects = lessonPlanModel.Subjects?.ToSubjectsDTO(),
                Responsible = lessonPlanModel.Responsible?.ToUserDto(),
                Grades = lessonPlanModel.Grades?.ToGradesDto(),
                CreatedOn = lessonPlanModel.CreatedOn,
                LastUpdatedOn = lessonPlanModel.LastUpdatedOn,
            };
        }
    }
}