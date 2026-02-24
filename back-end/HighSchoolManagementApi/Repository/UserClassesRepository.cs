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
    public class UserClassesRepository: IUserClassesRepository
    {
        private readonly ApplicationDBContext _context;
        public UserClassesRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<UserClasses>> GetUserClasses(int userId)
        {
            var userClasses = _context.UserClasses.AsQueryable();
            userClasses = userClasses.Where(s => s.UsersId == userId);
            return await userClasses.ToListAsync();
        }
        public async Task<UserClasses?> AddtoClass(UserClasses userClass)
        {
            await _context.UserClasses.AddAsync(userClass);
            await _context.SaveChangesAsync();
            return userClass;
        }
        public async Task<UserClasses?> RemoveFromClass(int userId, int classId)
        {
            var usersClassModel = await _context
                .UserClasses
                .FirstOrDefaultAsync(x => x.UsersId == userId && x.ClassId == classId);
            if(usersClassModel == null) return null;
            _context.UserClasses.Remove(usersClassModel);
            await _context.SaveChangesAsync();
            return usersClassModel;
        }
    }
}