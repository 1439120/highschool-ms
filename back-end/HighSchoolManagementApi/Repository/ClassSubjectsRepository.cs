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
    public class ClassSubjectsRepository: IClassSubjectsRepository
    {
        private readonly ApplicationDBContext _context;
        public ClassSubjectsRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Subjects>> GetClassSubjects(int classId)
        {
            return await _context.ClassSubjects.Where(u => u.ClassId == classId)
            .Select(subject => new Subjects
            {
                Id = subject.SubjectId,
                Name = subject.Subject.Name,
                GradeId = subject.Subject.GradeId
            }).ToListAsync();
        }
        public async Task<ClassSubjects> AddSubjectToClass(ClassSubjects classSubject)
        {
            await _context.ClassSubjects.AddAsync(classSubject);
            await _context.SaveChangesAsync();
            return classSubject;
        }
        public async Task<ClassSubjects?> DeleteClassSubject(int classId, int subjectId)
        {
            var classSubjectModel = await _context.ClassSubjects.FirstOrDefaultAsync(s => s.ClassId == classId && s.SubjectId == subjectId);
            if(classSubjectModel == null) return null;

            _context.ClassSubjects.Remove(classSubjectModel);
            await _context.SaveChangesAsync();
            return classSubjectModel;
        }
    }
}