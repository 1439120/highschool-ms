using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.SubjectPlan;
using HighSchoolManagementApi.Data;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Mappers;

namespace HighSchoolManagementApi.Repository
{
    public class SubjectPlanRepository: ISubjectPlanRepository
    {
        private readonly ApplicationDBContext _context;
        public SubjectPlanRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<SubjectPlan>> GetAll()
        {
            return await _context.SubjectPlan
            .Include(c => c.Grade)
            .Include(c => c.Subject)
            .Include(c => c.CreatedBy)
            .ThenInclude(u => u.UserDetails) 
            .ToListAsync();
        }
        public async Task<SubjectPlan> GetByIdAsync(int id)
        {
            return await _context.SubjectPlan
            .Include(c => c.Grade)
            .Include(c => c.Subject)
            .Include(c => c.CreatedBy)
            .ThenInclude(u => u.UserDetails)
            .FirstOrDefaultAsync(s => s.Id == id);
        }
        public async Task<SubjectPlan?> Update(UpdateSubjectPlanDto subjectPlan, int subjectPlanId)
        {
            var subjectPlanModel = await _context.SubjectPlan.FirstOrDefaultAsync(c => c.Id == subjectPlanId);
            if(subjectPlanModel == null) return null;

            subjectPlanModel.Name = subjectPlan.Name;
            subjectPlanModel.SubjectId = subjectPlan.SubjectId;
            subjectPlanModel.Name = subjectPlan.Name;
            subjectPlanModel.GradeId = subjectPlan.GradeId;
            subjectPlanModel.CreatedById = subjectPlan.CreatedById;
            subjectPlanModel.LastUpdatedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return subjectPlanModel;
        }
        public async Task<SubjectPlan> Add(AddSubjectPlanDto subjectPlanDto)
        {
            var subjectPlanModel = subjectPlanDto.FromAddDtoToSubjectPlan();
            await _context.SubjectPlan.AddAsync(subjectPlanModel);
            await _context.SaveChangesAsync();
            return subjectPlanModel;
        }
    }
}