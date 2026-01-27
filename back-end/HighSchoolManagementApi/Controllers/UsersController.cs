using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Versioning;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Mappers;

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
        public IActionResult GetBydId([FromRoute] int id)
        {
            var user = _context.Users.Find(id);
            if(user == null) return NotFound();
            return Ok(user.ToUsersDto());
        }

    }
}