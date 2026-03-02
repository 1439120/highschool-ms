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
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Helpers;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/subjects")]
    [ApiController]
    public class SubjectsControllers: ControllerBase
    {
        private readonly ISubjectRepository _subjectRepo;
        public SubjectsControllers( ISubjectRepository subjectRepo){
            _subjectRepo = subjectRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubjects([FromQuery] QueryObject query){
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var subjects = await _subjectRepo.GetAllAsync(query);
            if(subjects == null) return NotFound();

            var subjectsDto = subjects.Select(x => x.ToSubjectsDTO());
            return Ok(subjectsDto);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var subjects = await _subjectRepo.GetByIdAsync(id);
            if(subjects == null) return NotFound();

            return Ok(subjects.ToSubjectsDTO());
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateSubjectsDto createDto ){
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var subjectModel = createDto.ToSubjectsFromCreateDTO();
            await _subjectRepo.CreateAsync(subjectModel);
            return CreatedAtAction(nameof(GetById), new {id = subjectModel.Id}, subjectModel.ToSubjectsDTO());
        }
    }
    
}