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
    public class UserSubjectRepository: IUserSubjectRepository
    {
        private readonly ApplicationDBContext _context;
        public UserSubjectRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Subjects>> GetUserSubjects(AuthUser user)
        {
           return await _context.UserSubject.Where(u => u.AuthUserId == user.Id)
            .Select(subject => new Subjects
            {
                Id = subject.SubjectId,
                Name = subject.Subjects.Name,
                GradeId = subject.Subjects.GradeId
            }).ToListAsync();
        }
    }
}