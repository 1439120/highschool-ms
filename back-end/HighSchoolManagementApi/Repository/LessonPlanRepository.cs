using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Data;
using Microsoft.EntityFrameworkCore;

namespace HighSchoolManagementApi.Repository
{
    public class LessonPlanRepository: ILessonPlanRepository
    {
        private readonly ApplicationDBContext _context;
        public LessonPlanRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<LessonPlan>> GetAll()
        {
            return await _context.LessonPlan.ToListAsync();
        }
        public async Task<LessonPlan> GetAByTeacher(string authUserId)
        {
            return await _context.LessonPlan.FirstOrDefaultAsync(c => c.TeacherId == authUserId);
        }
        public async Task<LessonPlan?> Update(LessonPlan lessonPlan, int lessonId)
        {
            var lessonPlanModel = await _context.LessonPlan.FirstOrDefaultAsync(c => c.Id == lessonId);
            if(lessonPlanModel == null) return null;

            lessonPlanModel.Name = lessonPlan.Name;
            lessonPlanModel.SubjectId = lessonPlan.SubjectId;
            lessonPlanModel.Name = lessonPlan.Name;
            lessonPlanModel.GradeId = lessonPlan.GradeId;
            lessonPlanModel.TeacherId = lessonPlan.TeacherId;
            lessonPlanModel.LastUpdatedOn = lessonPlan.LastUpdatedOn;

            await _context.SaveChangesAsync();
            return lessonPlanModel;
        }
    }
}