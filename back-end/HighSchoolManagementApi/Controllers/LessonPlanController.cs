using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using HighSchoolManagementApi.Dtos.LessonPlan;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/lesson-plan")]
    [ApiController]
    public class LessonPlanController: ControllerBase
    {
        private readonly ILessonPlanRepository _lessonPlanRepo;
        public LessonPlanController(ILessonPlanRepository lessonPlanRepo)
        {
            _lessonPlanRepo = lessonPlanRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var lessonPlans = await _lessonPlanRepo.GetAll();
            return Ok(lessonPlans);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromBody] AddLessonPlanDto lessonPlanDto)
        {
            var lessonPlan = await _lessonPlanRepo.Add(lessonPlanDto);
            return Ok(lessonPlan);
        }
    }
}