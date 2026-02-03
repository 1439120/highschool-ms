using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Interfaces
{
    public interface IClassroomRepository
    {
        Task<List<Classroom>> GetAllAsync();
        Task<Classroom> GetByIdAsync(int id);
        Task<Classroom> AddAsync(Classroom classroomModel);
    }
}