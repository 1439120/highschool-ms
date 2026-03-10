using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Versioning;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Mappers;
using HighSchoolManagementApi.Dtos.Users;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        private readonly IUsersRepository _usersRepo;
        public UsersController(IUsersRepository usersRepo)
        {
            _usersRepo = usersRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var users = await _usersRepo.GetAllAsync(query);
            var usersDto = users.Select(s => s.ToUsersDto());
            return Ok(usersDto);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var user = await _usersRepo.GetByIdAsync(id);
            if(user == null) return NotFound();
            return Ok(user.ToUsersDto());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUsersRequestDto usersDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var usersModel = usersDto.ToUsersFromCreateDTO();
            await _usersRepo.CreateAsync(usersModel);
            return CreatedAtAction(nameof(GetById), new {id = usersModel.Id}, usersModel.ToUsersDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateUsersRequestDto updateDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var usersModel = await _usersRepo.UpdateAsync(id, updateDto);
            if(usersModel == null) return NotFound("User Not Found");

            return Ok(usersModel.ToUsersDto());
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> AssignToClass([FromRoute] int id, [FromRoute] int classId)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var usersModel = await _usersRepo.AssignToClass(id, classId);
            if(usersModel == null) return NotFound("User Not Found");

            return Ok(usersModel.ToUsersDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var usersModel = await _usersRepo.DeleteAsync(id);
            if(usersModel == null) return NotFound();

            return NoContent();
        }

    }
}