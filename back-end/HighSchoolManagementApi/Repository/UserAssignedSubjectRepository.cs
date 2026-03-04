using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Interfaces;

namespace HighSchoolManagementApi.Repository
{
    public class UserAssignedSubjectRepository: IUserAssignedSubjectRepository
    {
        private readonly ApplicationDBContext _context;
        public UserAssignedSubjectRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Subjects>> GetAssignedSubjects(int userId, int classId)
        {
            return await _context.UserAssignedSubjects
                .Where(c => c.UserId == userId && c.ClassId == classId)
                .Select(subject => new Subjects
                {
                    Id = subject.SubjectId,
                    Name = subject.Subject.Name,
                    GradeId = subject.Subject.GradeId
                })
                .ToListAsync();
        }
        public async Task<UserAssignedSubjects> AssignSubjects(UserAssignedSubjects subject)
        {
            await _context.UserAssignedSubjects.AddAsync(subject);
            await _context.SaveChangesAsync();
            return subject;
        }
        public async Task<UserAssignedSubjects?> UnAssignSubjects(int userId, int classId, int subjectId)
        {
            var subject = await _context.UserAssignedSubjects.FirstOrDefaultAsync(
                c => c.UserId == userId && c.ClassId == classId && c.SubjectId == subjectId
            );
            if(subject == null) return null;

            _context.UserAssignedSubjects.Remove(subject);
            await _context.SaveChangesAsync();
            return subject;
        }
    }
}