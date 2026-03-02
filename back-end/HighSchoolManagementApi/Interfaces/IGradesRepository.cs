using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Grades;

namespace HighSchoolManagementApi.Interfaces
{
    public interface IGradesRepository
    {
        Task<List<Grades>> GetAllAsync();
        Task<Grades?> GetByIdAsync(int id);
        Task<Grades> CreateAsync(Grades gradesModel);
        Task<Grades?> UpdateAsync(int id, UpdateGradesDto gradesDto);
        Task<Grades?> DeleteAsync(int id);
    }
}