using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Interfaces
{
    public interface IUserClassesRepository
    {
        Task<List<UserClasses>> GetUserClasses(int userId);
        Task<UserClasses?> AddtoClass(UserClasses userClass);
        Task<UserClasses?> RemoveFromClass(int userId, int classId);
    }
}