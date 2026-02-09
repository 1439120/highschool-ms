using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Subjects;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Interfaces;

namespace HighSchoolManagementApi.Repository
{
    public class SubjectsRepository: ISubjectRepository
    {
        private readonly ApplicationDBContext _context;
        public SubjectsRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Subjects>> GetAllAsync()
        {
            var subjects = await _context.Subjects.ToListAsync();
            return subjects;
        }
        public async Task<Subjects?> GetByIdAsync(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);
            return subject;
        }
        public async Task<Subjects?> GetBySymbolAsync(string symbol)
        {
            return await _context.Subjects.FirstOrDefaultAsync(s => s.Name == symbol);
        }
        public async Task<Subjects> CreateAsync(Subjects subjectsModel)
        {
            await _context.Subjects.AddAsync(subjectsModel);
            await _context.SaveChangesAsync();

            return subjectsModel;
        }
        public async Task<Subjects?> UpdateAsync(int id, UpdateSubjectsDto subjectsDto)
        {
            var subject = await _context.Subjects.FirstOrDefaultAsync(c => c.Id == id);
            if(subject == null) return null;
            
            subject.Name = subjectsDto.Name;
            subject.GradeId = subjectsDto.GradeId;

            return subject;
        }
        public async Task<Subjects?> DeleteAsync(int id)
        {
            var subjectsModel = await _context.Subjects.FirstOrDefaultAsync(x => x.Id == id);
            if(subjectsModel == null) return null;
            _context.Subjects.Remove(subjectsModel);
            await _context.SaveChangesAsync();
            return subjectsModel;
        }
    }
}