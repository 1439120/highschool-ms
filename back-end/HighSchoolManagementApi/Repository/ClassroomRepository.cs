using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Dtos.Classroom;
using HighSchoolManagementApi.Mappers;

namespace HighSchoolManagementApi.Repository
{
    public class ClassroomRepository: IClassroomRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IUserClassesRepository _userClassRepo;
        public ClassroomRepository(ApplicationDBContext context, IUserClassesRepository userClassRepo)
        {
            _context = context;
            _userClassRepo = userClassRepo;
        }
        public async Task<List<Classroom>> GetAllAsync()
        {
            return await _context.Classroom.Include(c => c.Learners)
                .Include(c => c.Grade)
                .Include(c => c.ClassTeacher)
                .ToListAsync();
        }
        public async Task<List<Classroom>> GetAvaialbleForTeacherAsync(int teacherId)
        {
            var userClasses = await _userClassRepo.GetUserClasses(teacherId);
            var assignedClassIds = userClasses
                .Select(x => x.Class.Id)
                .ToList();

            var classes = _context.Classroom.AsQueryable();
            classes = classes
                .Where(s => !assignedClassIds.Contains(s.Id))
                .Include(c => c.Grade)
                .Include(c => c.ClassTeacher);
            
            return await classes.ToListAsync();
        }
        public async Task<Classroom> GetByIdAsync(int id)
        {
            return await _context.Classroom.Include(c => c.Learners)
            .Include(c => c.Grade)
            .Include(c => c.ClassTeacher)
            .FirstOrDefaultAsync(i => i.Id == id);
        }
        public async Task<Classroom> AddAsync(Classroom classroomModel)
        {
            await _context.Classroom.AddAsync(classroomModel); // tracking
            await _context.SaveChangesAsync(); // now it is sent to the server
            return classroomModel;
        }

        public async Task<Classroom?> Update(int id, UpdateClassroomDto classroomDto)
        {
            var updateClassroom = await _context.Classroom.FirstOrDefaultAsync(i => i.Id == id);
            if(updateClassroom == null) return null;

            updateClassroom.Name = classroomDto.Name;
            updateClassroom.GradeId = classroomDto.Grade;
            updateClassroom.ClassTeacherId = classroomDto.ClassTeacher;
            updateClassroom.MaximumOccupants = classroomDto.MaximumOccupants;
            updateClassroom.RegisteredStudents = classroomDto.RegisteredStudents;
            updateClassroom.AcademicYear = classroomDto.AcademicYear;
            updateClassroom.RoomNumber = classroomDto.RoomNumber;

            await _context.SaveChangesAsync();
            return updateClassroom;
        }
    }
}