using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Subjects;

namespace HighSchoolManagementApi.Interfaces
{
    public interface ISubjectRepository
    {
        Task<List<Subjects>> GetAllAsync();
        Task<Subjects?> GetByIdAsync(int id); // If user not found it can be null
        Task<Subjects?> GetBySymbolAsync(string symbol);
        Task<Subjects> CreateAsync(Subjects subjectsModel);
        Task<Subjects?> UpdateAsync(int id, UpdateSubjectsDto subjectsDto);
        Task<Subjects?> DeleteAsync(int id);
    }
}