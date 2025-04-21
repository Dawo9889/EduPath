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
        // TODO: Add admin auth 
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO dto)
        {
            var result = await _userService.CreateUserAsync(dto);
            if (result )
                return Ok("User Created");

            return BadRequest("Something went wrong");
        }
    }
}
