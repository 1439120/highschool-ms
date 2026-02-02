using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using HighSchoolManagementApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HighSchoolManagementApi.Dtos.Subjects;
using HighSchoolManagementApi.Mappers;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/subjects")]
    [ApiController]
    public class SubjectsControllers: ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public SubjectsControllers(ApplicationDBContext context){
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubjects(){
            var subjects = await _context.Subjects.ToListAsync();
            if(subjects == null) return NotFound();

            return Ok(subjects);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var subjects = await _context.Subjects.FindAsync(id);
            if(subjects == null) return NotFound();

            return Ok(subjects);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateSubjectsDto createDto ){
            var subjectModel = createDto.ToSubjectsFromCreateDTO();
            await _context.Subjects.AddAsync(subjectModel);
            await _context.SaveChangesAsync();
            // return CreatedAction(nameof(GetById), new {id = createDto.Id}, createDto);
            return Ok("Created Successfully");
        }
    }
    
}