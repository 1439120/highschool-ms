using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Data;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Dtos.LessonPlan;
using HighSchoolManagementApi.Mappers;

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
            return await _context.LessonPlan.FirstOrDefaultAsync(c => c.ResponsibleId == authUserId);
        }
        public async Task<LessonPlan?> Update(LessonPlan lessonPlan, int lessonId)
        {
            var lessonPlanModel = await _context.LessonPlan.FirstOrDefaultAsync(c => c.Id == lessonId);
            if(lessonPlanModel == null) return null;

            lessonPlanModel.Name = lessonPlan.Name;
            lessonPlanModel.SubjectsId = lessonPlan.SubjectsId;
            lessonPlanModel.Name = lessonPlan.Name;
            lessonPlanModel.GradesId = lessonPlan.GradesId;
            lessonPlanModel.ResponsibleId = lessonPlan.ResponsibleId;
            lessonPlanModel.LastUpdatedOn = lessonPlan.LastUpdatedOn;

            await _context.SaveChangesAsync();
            return lessonPlanModel;
        }

        public async Task<LessonPlan> Add(AddLessonPlanDto lessonPlanDto)
        {
            var lessonPlanModel = lessonPlanDto.FromAddDtoToLessonPlan();
            await _context.LessonPlan.AddAsync(lessonPlanModel);
            await _context.SaveChangesAsync();
            return lessonPlanModel;
        }
    }
}