using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HighSchoolManagementApi.Dtos.SubjectPlan;
using HighSchoolManagementApi.Models;
using HighSchoolManagementApi.Interfaces;
using HighSchoolManagementApi.Mappers;
using Microsoft.AspNetCore.Identity;
using HighSchoolManagementApi.Extensions;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/subject-plan")]
    [ApiController]
    public class SubjectPlanController: ControllerBase
    {
        private readonly ISubjectPlanRepository _subjectPlanRepo;
        private readonly UserManager<AuthUser> _userManager;
        public SubjectPlanController(UserManager<AuthUser> userManager, ISubjectPlanRepository subjectPlanRepo)
        {
            _subjectPlanRepo = subjectPlanRepo;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var subjectPlans = await _subjectPlanRepo.GetAll();
            
            var subjectPlanDto = subjectPlans.Select(a => a.ToSubjectPlanDto());
            return Ok(subjectPlanDto);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var subjectPlan = await _subjectPlanRepo.GetByIdAsync(id);
            return Ok(subjectPlan.ToSubjectPlanDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromBody] AddSubjectPlanDto subjectPlanDto)
        {
            var username = User.GetUsername();
            var authUser = await _userManager.FindByNameAsync(username);
            var subjectPlan = await _subjectPlanRepo.Add(subjectPlanDto, authUser);
            
            return Ok(subjectPlan);
        }
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update( [FromRoute] int id, [FromBody] UpdateSubjectPlanDto subjectPlanDto)
        {
            var subjectPlan = await _subjectPlanRepo.Update(subjectPlanDto, id);
            
            return Ok(subjectPlan);
        }
    }
}