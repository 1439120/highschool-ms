using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Interfaces
{
    public interface IUserAssignedSubjectRepository
    {
        Task<List<Subjects>> GetAssignedSubjects(int userId, int classId);
        Task<UserAssignedSubjects> AssignSubjects(UserAssignedSubjects subject);
        Task<UserAssignedSubjects?> UnAssignSubjects(int userId, int classId, int subjectId);
    }
}