using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Versioning;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Mappers;
using HighSchoolManagementApi.Dtos.Users;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Interfaces;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IUsersRepository _usersRepo;
        public UsersController(ApplicationDBContext context, IUsersRepository usersRepo)
        {
            _context = context;
            _usersRepo = usersRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _usersRepo.GetAllAsync();
            var usersDto = users.Select(s => s.ToUsersDto());
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null) return NotFound();
            return Ok(user.ToUsersDto());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUsersRequestDto usersDto)
        {
            var usersModel = usersDto.ToUsersFromCreateDTO();
            await _context.Users.AddAsync(usersModel); // tracking
            await _context.SaveChangesAsync(); // now it is sent to the server
            return CreatedAtAction(nameof(GetById), new {id = usersModel.Id}, usersModel.ToUsersDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateUsersRequestDto updateDto)
        {
            var usersModel = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if(usersModel == null) return NotFound();

            usersModel.Name = updateDto.Name;
            usersModel.Surname = updateDto.Surname;
            usersModel.Phone = updateDto.Phone;
            usersModel.Email = updateDto.Email;
            usersModel.Role = updateDto.Role;
            usersModel.Address = updateDto.Address;
            usersModel.DateOfBirth = updateDto.DateOfBirth;
            usersModel.DateJoined = updateDto.DateJoined;
            usersModel.Type = updateDto.Type;
            usersModel.CreatedOn = updateDto.CreatedOn;

            await _context.SaveChangesAsync();
            return Ok(usersModel.ToUsersDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var usersModel = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if(usersModel == null) return NotFound();

            _context.Users.Remove(usersModel);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}