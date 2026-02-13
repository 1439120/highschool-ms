using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HighSchoolManagementApi.Dtos.SubjectPlan;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Interfaces;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/subject-plan")]
    [ApiController]
    public class SubjectPlanController: ControllerBase
    {
        private readonly ISubjectPlanRepository _subjectPlanRepo;
        public SubjectPlanController(ISubjectPlanRepository subjectPlanRepo)
        {
            _subjectPlanRepo = subjectPlanRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var subjectPlans = await _subjectPlanRepo.GetAll();
            // var lessonPlanDto = lessonPlans.Select(a => a.ToLessonPlanDto());
            return Ok(subjectPlans);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromBody] AddSubjectPlanDto subjectPlanDto)
        {
            var subjectPlan = await _subjectPlanRepo.Add(subjectPlanDto);
            
            return Ok(subjectPlan);
        }
    }
}