using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

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

        public async Task<UserSubject> CreateAsync(UserSubject userSubject)
        {
            await _context.UserSubject.AddAsync(userSubject);
            await _context.SaveChangesAsync();
            return userSubject;
        }

        public async Task<UserSubject> DeeleteUserSubject(AuthUser authUser, string symbol)
        {
            var userSubjectModel = await _context.UserSubject.FirstOrDefaultAsync(s => s.AuthUserId == authUser.Id && s.Subjects.Name.ToLower() == symbol.ToLower());
            if(userSubjectModel == null) return null;

            _context.UserSubject.Remove(userSubjectModel);
            await _context.SaveChangesAsync();
            return userSubjectModel;
        }
    }
}