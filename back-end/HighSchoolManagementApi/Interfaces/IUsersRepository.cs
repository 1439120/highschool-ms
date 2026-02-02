using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Users;

namespace HighSchoolManagementApi.Interfaces
{
    public interface IUsersRepository
    {
        public Task<List<Users>> GetAllAsync();
        Task<Users?> GetByIdAsync(int id); // If user not found it can be null
        Task<Users> CreateAsync(Users usersModel);
        Task<Users?> UpdateAsync(int id, UpdateUsersRequestDto usersDto);
        Task<Users?> DeleteAsync(int id);

    }
}