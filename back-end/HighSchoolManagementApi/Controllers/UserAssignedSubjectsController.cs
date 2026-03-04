using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Interfaces;
using Microsoft.AspNetCore.Authorization;

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
    }
}