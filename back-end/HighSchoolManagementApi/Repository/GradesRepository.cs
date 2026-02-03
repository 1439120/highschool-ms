using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Grades;
using Microsoft.EntityFrameworkCore;

namespace HighSchoolManagementApi.Repository
{
    public class GradesRepository: IGradesRepository
    {
        private readonly ApplicationDBContext _context;
        public GradesRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Grades>> GetAllAsync()
        {
            var grades = await _context.Grades.ToListAsync();
            return grades;
        }
        public async Task<Grades?> GetByIdAsync(int id)
        {
            return await _context.Grades.FindAsync(id);
        }
        public async Task<Grades> CreateAsync(Grades gradesModel)
        {
            await _context.Grades.AddAsync(gradesModel);
            await _context.SaveChangesAsync();
            return gradesModel;
        }
        public async Task<Grades?> UpdateAsync(int id, UpdateGradesDto gradesDto)
        {
            var gradesModel = await _context.Grades.FirstOrDefaultAsync(x => x.Id == id);
            if(gradesModel == null) return null;

            gradesModel.Name = gradesDto.Name;
            gradesModel.GradeNumber = gradesDto.GradeNumber;

            await _context.SaveChangesAsync();
            return gradesModel;
        }
        public async Task<Grades?> DeleteAsync(int id)
        {
            var gradesModel = await _context.Grades.FirstOrDefaultAsync(x => x.Id == id);
            if(gradesModel == null) return null;
            _context.Grades.Remove(gradesModel);
            await _context.SaveChangesAsync();
            return gradesModel;
        }
    }
}