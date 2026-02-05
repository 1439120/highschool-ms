using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Users;
using HighSchoolManagementApi.Helpers;

namespace HighSchoolManagementApi.Repository
{
    public class UsersRepository: IUsersRepository
    {
        private readonly ApplicationDBContext _context;
        public UsersRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Users>> GetAllAsync(QueryObject query)
        {
            var users = _context.Users.AsQueryable();
            if(!string.IsNullOrWhiteSpace(query.Name)) users = users.Where(s => s.Name.ToLower().Contains(query.Name.ToLower()));
            if(!string.IsNullOrWhiteSpace(query.Surname)) users = users.Where(s => s.Surname.ToLower().Contains(query.Surname.ToLower()));
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    users = query.IsDescending ? users.OrderByDescending(s => s.Name) : users.OrderBy(s => s.Name);
                }
            }

            var skipNumber= (query.PageNumber - 1) * query.PageSize;

            return await users.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Users> CreateAsync(Users usersModel)
        {
            await _context.Users.AddAsync(usersModel); // tracking
            await _context.SaveChangesAsync(); // now it is sent to the server
            return usersModel;
        }

        public async Task<Users?> DeleteAsync(int id)
        {
            var usersModel = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if(usersModel == null) return null;
            _context.Users.Remove(usersModel);
            await _context.SaveChangesAsync();
            return usersModel;
        }

        public async Task<Users?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<Users?> UpdateAsync(int id, UpdateUsersRequestDto usersDto)
        {
            var usersModel = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if(usersModel == null) return null;

            usersModel.Name = usersDto.Name;
            usersModel.Surname = usersDto.Surname;
            usersModel.Phone = usersDto.Phone;
            usersModel.Email = usersDto.Email;
            usersModel.Role = usersDto.Role;
            usersModel.Address = usersDto.Address;
            usersModel.DateOfBirth = usersDto.DateOfBirth;
            usersModel.DateJoined = usersDto.DateJoined;
            usersModel.Type = usersDto.Type;
            usersModel.LearnerClassroomId = usersDto.LearnerClassroomId;

            await _context.SaveChangesAsync();
            return usersModel;
        }
    }
}