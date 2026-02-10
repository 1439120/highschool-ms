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
    }
}