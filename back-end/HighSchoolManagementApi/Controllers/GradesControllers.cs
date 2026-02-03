using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Dtos.Grades;
using HighSchoolManagementApi.Mappers;
using HighSchoolManagementApi.Data;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Mappers;
using HighSchoolManagementApi.Repository;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/grades")]
    [ApiController]
    public class GradesControllers: ControllerBase
    {
        private readonly IGradesRepository _gradesRepo;
        public GradesControllers(IGradesRepository gradesRepo)
        {
            _gradesRepo = gradesRepo;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var grades = await _gradesRepo.GetAllAsync();
            var gradesDto = grades.Select(s => s.ToGradesDto());
            if(gradesDto == null) return NotFound();
            return Ok(gradesDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var grades = await _gradesRepo.GetByIdAsync(id);
            if(grades == null) return NotFound();
            return Ok(grades.ToGradesDto());
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateGradesDto createDto)
        {
            var gradesModel = createDto.ToGradesFromCreateDto();
            await _gradesRepo.CreateAsync(gradesModel);
            return CreatedAtAction(nameof(GetById), new {id = gradesModel.Id}, gradesModel.ToGradesDto());
        }
    }
}