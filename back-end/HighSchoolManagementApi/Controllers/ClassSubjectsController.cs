using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using HighSchoolManagementApi.Interfaces;

namespace HighSchoolManagementApi.Controllers
{
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
    }
}