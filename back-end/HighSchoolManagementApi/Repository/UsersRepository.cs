using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Repository
{
    public class UsersRepository: IUsersRepository
    {
        private readonly ApplicationDBContext _context;
        public UsersRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public Task<List<Users>> GetAllAsync()
        {
            return _context.Users.ToListAsync();
        }
    }
}