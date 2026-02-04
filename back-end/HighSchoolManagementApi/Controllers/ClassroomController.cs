using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Mappers;
using HighSchoolManagementApi.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Dtos.Classroom;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/classroom")]
    [ApiController]
    public class ClassroomController: ControllerBase
    {
        private readonly IClassroomRepository _classroomRepo;
        public ClassroomController(IClassroomRepository classroomRepo)
        {
            _classroomRepo = classroomRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var classrooms = await _classroomRepo.GetAllAsync();

            var classroomDto = classrooms.Select(s => s.ToClassroomDto());

            return Ok(classroomDto);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetBydId([FromRoute] int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var classroomsModel = await _classroomRepo.GetByIdAsync(id);
            if(classroomsModel == null) return NotFound();

            return Ok(classroomsModel.ToClassroomDto());
        }
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateClassroomDto classroomDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var classroomsModel = classroomDto.ToClassroomFromCreateDTO();
            await _classroomRepo.AddAsync(classroomsModel);
            return Ok(classroomsModel.ToClassroomDto());
        }
    }
}