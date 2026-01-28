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

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public UsersController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.Users.ToList().Select(s => s.ToUsersDto());
            return Ok(users);
        }
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var user = _context.Users.Find(id);
            if(user == null) return NotFound();
            return Ok(user.ToUsersDto());
        }
        [HttpPost]
        public IActionResult Create([FromBody] CreateUsersRequestDto usersDto)
        {
            var usersModel = usersDto.ToUsersFromCreateDTO();
            _context.Users.Add(usersModel); // tracking
            _context.SaveChanges(); // now it is sent to the server
            return CreatedAtAction(nameof(GetById), new {id = usersModel.Id}, usersModel.ToUsersDto());
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateUsersRequestDto updateDto)
        {
            var usersModel = _context.Users.FirstOrDefault(x => x.Id == id);
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

            _context.SaveChanges();
            return Ok(usersModel.ToUsersDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var usersModel = _context.Users.FirstOrDefault(x => x.Id == id);
            if(usersModel == null) return NotFound();

            _context.Users.Remove(usersModel);
            _context.SaveChanges();
            return NoContent();
        }

    }
}