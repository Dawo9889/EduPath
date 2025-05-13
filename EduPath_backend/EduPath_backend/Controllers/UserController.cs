using EduPath_backend.Application.DTOs.User;
using EduPath_backend.Application.Services.User;
using Microsoft.AspNetCore.Mvc;

namespace EduPath_backend.API.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("get-all-users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _userService.GetAllUsersAsync();
            return Ok(result);
        }

        [HttpGet("get-users-by-role/{roleName}")]
        public async Task<IActionResult> GetAllUsersByRole(string roleName)
        {
            var result = await _userService.GetUsersByRoleAsync(roleName);
            return Ok(result);
        }

        // TODO: Add admin auth 
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO dto)
        {
            var result = await _userService.CreateUserAsync(dto);
            if (result )
                return Ok("User Created");

            return BadRequest("Something went wrong");
        }
        [HttpPost("assignUserToCourse")]
        public async Task<IActionResult> AssignUserToCourse([FromBody] UserCourseDTO userCourseDTO)
        {
            var result = await _userService.AssignUserToCourseAsync(userCourseDTO);
            if (result)
                return Ok("User assigned to this course");

            return BadRequest("Something went wrong while assign user to course");
        }

        [HttpDelete("deleteUserFromCourse")]
        public async Task<IActionResult> DeleteUserFromCourse([FromBody] UserCourseDTO userCourseDTO)
        {
            var result = await _userService.DeleteUserFromCourseAsync(userCourseDTO);
            if (result)
                return Ok("User removed from this course");

            return BadRequest("Something went wrong while removing this user");
        }
    }
}
