using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HighSchoolManagementApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using HighSchoolManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using HighSchoolManagementApi.Dtos.UserClasses;
using HighSchoolManagementApi.Mappers;

namespace HighSchoolManagementApi.Controllers
{
    [Route("api/user-classes")]
    [ApiController]
    public class UserClassesController: ControllerBase
    {
        private readonly UserManager<AuthUser> _userManager;
        private readonly IUserClassesRepository _userClassRepo;
        public UserClassesController(UserManager<AuthUser> userManager, IUserClassesRepository userClassRepo)
        {
            _userManager = userManager;
            _userClassRepo = userClassRepo;
        }
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetUserClasses([FromRoute] int id)
        {
            var userClasses = await _userClassRepo.GetUserClasses(id);
            var userClassesDto = userClasses.Select(s => s.ToUserClassesDto());

            return Ok(userClassesDto);
        } 
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AssignUserToClass([FromBody] UserClassesCreateDto userClasses)
        {
            var userClass = await _userClassRepo.AddtoClass(userClasses.FromCreateDtoToUserClasses());
            if(userClass == null) return NotFound();

            return Ok(userClass);
        }
        [HttpDelete("{classId:int}/{userId:int}")]
        [Authorize]
        public async Task<IActionResult> RemoveUserFromClass([FromRoute] int classId, [FromRoute] int userId)
        {
            var userClass = _userClassRepo.RemoveFromClass(classId, userId);
            if(userClass == null) return NotFound();

            return Ok(userClass);
        } 

    }
}