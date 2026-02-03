using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HighSchoolManagementApi.Repository
{
    public class ClassroomRepository: IClassroomRepository
    {
        private readonly ApplicationDBContext _context;
        public ClassroomRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Classroom>> GetAllAsync()
        {
            return await _context.Classroom.Include(c => c.Learners).ToListAsync();
        }
        public async Task<Classroom> GetByIdAsync(int id)
        {
            return await _context.Classroom.Include(c => c.Learners).FirstOrDefaultAsync(i => i.Id == id);
        }
        public async Task<Classroom> AddAsync(Classroom classroomModel)
        {
            await _context.Classroom.AddAsync(classroomModel); // tracking
            await _context.SaveChangesAsync(); // now it is sent to the server
            return classroomModel;
        }
    }
}