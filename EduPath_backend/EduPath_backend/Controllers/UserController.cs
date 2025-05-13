using EduPath_backend.Application.DTOs.User;
using EduPath_backend.Application.Services.User;
using Microsoft.AspNetCore.Identity.Data;
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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, response, error) = await _userService.LoginAsync(model);
            if (!success)
                return Unauthorized(error);

            return Ok(response);
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
