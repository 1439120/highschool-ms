using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using HighSchoolManagementApi.Dtos.UserSubjects;
using HighSchoolManagementApi.Mappers;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/user-subjects")]
    [ApiController]
    public class UserAssignedSubjectsController: ControllerBase
    {
        private readonly IUserAssignedSubjectRepository _userAssignRepo;
        public UserAssignedSubjectsController(IUserAssignedSubjectRepository userAssignRepo)
        {
            _userAssignRepo = userAssignRepo;
        }

        [HttpGet("{userId:int}/{classId:int}")]
        [Authorize]
        public async Task<IActionResult> getSubjects([FromRoute] int userId, [FromRoute] int classId)
        {
            var subjects = await _userAssignRepo.GetAssignedSubjects(userId, classId);
            return Ok(subjects);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AssignSubjectToClass([FromBody] UserAssignedSubjectDto subjectDto)
        {
            var userSubjects = await _userAssignRepo.AssignSubjects(subjectDto.FromDtoToAssignedSubjects());
            return Ok(userSubjects);
        } 
        [HttpDelete("{userId:int}/{classId:int}/{subjectId:int}")]
        [Authorize]
        public async Task<IActionResult> UnAssignSubjectToClass([FromRoute] int userId, [FromRoute] int classId, [FromRoute] int subjectId)
        {
            var userSubjects = await _userAssignRepo.UnAssignSubjects(userId, classId, subjectId);
            if(userSubjects == null) return NotFound();
            return Ok(userSubjects);
        } 
    }
}