using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.LessonPlan;

namespace HighSchoolManagementApi.Interfaces
{
    public interface ILessonPlanRepository
    {
        Task<List<LessonPlan>> GetAll();
        Task<LessonPlan> GetAByTeacher(string authUserId);
        Task<LessonPlan?> Update(LessonPlan lessonPlan, int lessonId);
        Task<LessonPlan> Add(AddLessonPlanDto lessonPlanDto);
    }
}