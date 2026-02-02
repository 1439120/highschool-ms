using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Interfaces;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Dtos.Users;

namespace HighSchoolManagementApi.Repository
{
    public class UsersRepository: IUsersRepository
    {
        private readonly ApplicationDBContext _context;
        public UsersRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Users>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
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
            usersModel.CreatedOn = usersDto.CreatedOn;

            await _context.SaveChangesAsync();
            return usersModel;
        }
    }
}