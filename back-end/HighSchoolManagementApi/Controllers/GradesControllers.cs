using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Dtos.Grades;
using HighSchoolManagementApi.Mappers;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/grades")]
    [ApiController]
    public class GradesControllers: ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public GradesControllers(ApplicationDBContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public IActionResult GetAll()
        {
            var grades = _context.Grades.ToList();
            if(grades == null) return NotFound();
            return Ok(grades);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var grades = _context.Grades.Find(id);
            if(grades == null) return NotFound();
            return Ok(grades);
        }

        [HttpPost]
        public IActionResult Add([FromBody] CreateGradesDto createDto)
        {
            var gradesModel = createDto.ToGradesFromCreateDto();
            _context.Grades.Add(gradesModel);
            _context.SaveChanges();
            return Ok("Added successfully");
        }
    }
}