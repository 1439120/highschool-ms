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
using System.Linq.Expressions;

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

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddUserSubject(string symbol)
        {
            var username = User.GetUsername();
            var authUser = await _userManager.FindByNameAsync(username);
            var subject = await _subjectRepo.GetBySymbolAsync(symbol);

            if(subject == null) return BadRequest("Subject Not Found");
            var userSubjects = await _userSubjectRepo.GetUserSubjects(authUser);

            if(userSubjects.Any(e => e.Name.ToLower() == symbol.ToLower())) return BadRequest("Cannot add same subject");

            var userSubjectModel = new UserSubject
            {
                AuthUserId = authUser.Id,
                SubjectId = subject.Id
            }; 
            await _userSubjectRepo.CreateAsync(userSubjectModel);
            if(userSubjectModel == null)
            {
                return StatusCode(500, "Could not create");
            }
            return Created();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteUserSubject(string symbol)
        {
            var username = User.GetUsername();
            var authUser = await _userManager.FindByNameAsync(username);

            var userSubjects = await _userSubjectRepo.GetUserSubjects(authUser);

            var filteredSubjects = userSubjects.Where(s => s.Name.ToLower() == symbol.ToLower()).ToList();
            if(filteredSubjects.Count() == 1)
            {
                await _userSubjectRepo.DeeleteUserSubject(authUser, symbol);
            }
            else
            {
                return BadRequest("You dont have this subject");
            }
            return Ok();
        }
    }
}