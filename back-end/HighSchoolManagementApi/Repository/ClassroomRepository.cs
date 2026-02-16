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
        public ClassroomRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Classroom>> GetAllAsync()
        {
            return await _context.Classroom.Include(c => c.Learners)
                .Include(c => c.Grade)
                .Include(c => c.ClassTeacher)
                .ToListAsync();
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
            updateClassroom.academicYear = classroomDto.academicYear;
            updateClassroom.roomNumber = classroomDto.roomNumber;

            await _context.SaveChangesAsync();
            return updateClassroom;
        }
    }
}