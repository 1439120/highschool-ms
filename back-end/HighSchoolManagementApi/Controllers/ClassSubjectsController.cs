using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Dtos.ClassSubjects;
using HighSchoolManagementApi.Mappers;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/class-subjects")]
    [ApiController]
    public class ClassSubjectsController: ControllerBase
    {
        private readonly IClassSubjectsRepository _classSubjectRepo;
        public ClassSubjectsController(IClassSubjectsRepository classSubjectRepo)
        {
            _classSubjectRepo = classSubjectRepo;

        }

        [HttpGet("{classId:int}")]
        [Authorize]
        public async Task<IActionResult> GetClassSubjects([FromRoute] int classId)
        {
            var classSubjects = await _classSubjectRepo.GetClassSubjects(classId);
            return Ok(classSubjects);
        } 

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AssignSubjectToClass(ClassSubjectsDto classSubject)
        {
            var classSubjects = await _classSubjectRepo.AddSubjectToClass(classSubject.FromDtoToClassSUbject());
            return Ok(classSubjects);
        } 

        [HttpDelete("{classId:int}/{subjectId:int}")]
        [Authorize]
        public async Task<IActionResult> UnassignSubjectToClass([FromRoute] int classId, [FromRoute] int subjectId)
        {
            var classSubjects = await _classSubjectRepo.DeleteClassSubject(classId, subjectId);
            if(classSubjects == null) return NotFound();
            return Ok(classSubjects);
        } 
    }
}