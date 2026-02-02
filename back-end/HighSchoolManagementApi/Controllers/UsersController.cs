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
            var user = await _usersRepo.GetByIdAsync(id);
            if(user == null) return NotFound();
            return Ok(user.ToUsersDto());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUsersRequestDto usersDto)
        {
            var usersModel = usersDto.ToUsersFromCreateDTO();
            await _usersRepo.CreateAsync(usersModel);
            return CreatedAtAction(nameof(GetById), new {id = usersModel.Id}, usersModel.ToUsersDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateUsersRequestDto updateDto)
        {
            var usersModel = await _usersRepo.UpdateAsync(id, updateDto);
            if(usersModel == null) return NotFound();

            return Ok(usersModel.ToUsersDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var usersModel = await _usersRepo.DeleteAsync(id);
            if(usersModel == null) return NotFound();

            return NoContent();
        }

    }
}