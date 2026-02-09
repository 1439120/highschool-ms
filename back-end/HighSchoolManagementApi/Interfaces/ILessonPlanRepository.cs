using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Interfaces
{
    public interface ILessonPlanRepository
    {
        Task<List<LessonPlan>> GetAll();
        Task<LessonPlan> GetAByTeacher(string authUserId);
        Task<LessonPlan> Update(LessonPlan lessonPlan, int lessonId);
    }
}