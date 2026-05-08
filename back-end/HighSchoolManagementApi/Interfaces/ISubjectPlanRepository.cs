using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.SubjectPlan;

namespace HighSchoolManagementApi.Interfaces
{
    public interface ISubjectPlanRepository
    {
        Task<List<SubjectPlan>> GetAll();
        Task<SubjectPlan> GetByIdAsync(int id);
        Task<SubjectPlan?> Update(UpdateSubjectPlanDto subjectPlan, int subjectPlanId);
        Task<SubjectPlan> Add(AddSubjectPlanDto subjectPlanDto, AuthUser authUser);
    }
}