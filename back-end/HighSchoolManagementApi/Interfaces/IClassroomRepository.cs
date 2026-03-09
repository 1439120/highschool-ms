using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Classroom;

namespace HighSchoolManagementApi.Interfaces
{
    public interface IClassroomRepository
    {
        Task<List<Classroom>> GetAllAsync();
        Task<List<Classroom>> GetAvaialbleForTeacherAsync(int teacherId);
        Task<Classroom> GetByIdAsync(int id);
        Task<Classroom> AddAsync(Classroom classroomModel);
        Task<Classroom?> Update(int id, UpdateClassroomDto classroomDto);
    }
}