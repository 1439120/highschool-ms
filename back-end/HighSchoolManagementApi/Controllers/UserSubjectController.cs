using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HighSchoolManagementApi.Extensions;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Models;
using Microsoft.AspNetCore.Identity;
using HighSchoolManagementApi.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/user-subject")]
    [ApiController]
    public class UserSubjectController: ControllerBase
    {
        private readonly UserManager<AuthUser> _userManager;
        private readonly ISubjectRepository _subjectRepo;
        private readonly IUserSubjectRepository _userSubjectRepo;
        public UserSubjectController(UserManager<AuthUser> userManager, ISubjectRepository subjectRepo, IUserSubjectRepository userSubjectRepo)
        {
            _userManager = userManager;
            _subjectRepo = subjectRepo;
            _userSubjectRepo = userSubjectRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserSubjects()
        {
            var username = User.GetUsername();
            var authUser = await _userManager.FindByNameAsync(username);

            var userSubjects = await _userSubjectRepo.GetUserSubjects(authUser);
            return Ok(userSubjects);
            
        } 
    }
}