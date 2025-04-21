using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Application.Services.Course;
using EduPath_backend.Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EduPath_backend.API.Controllers
{

    [Route("api/course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly IValidator<CreateCourseDTO> _createCourseValidator;

        public CourseController(ICourseService courseService, IValidator<CreateCourseDTO> createCourseValidator)   
        {
            _courseService = courseService;
            _createCourseValidator = createCourseValidator;
        }


        //Gets

        [HttpGet("all")]
        public async Task<List<ListCourseDTO>> GetAllCourses()
        {
            var courses = await _courseService.GetAvailableCoursesAsync();
            return courses;
        }

        [HttpGet("{id}")]
        public async Task<Course> GetCourseById(Guid id)
        {
            var course = await _courseService.GetCourseByIdAsync(id);
            return course;
        }


        [HttpGet("{courseId}/users")]
        public async Task<IActionResult> GetUsersByCourseId(Guid courseId)
        {
            var users = await _courseService.GetUsersByCourseId(courseId);
            if (users == null)
            {
                return NotFound("No users found for this course.");
            }
            return Ok(users);
        }

        //Post
        [HttpPost("create")]
        public async Task<IActionResult> AddCourse([FromBody] CreateCourseDTO courseDTO)
        {
            if (courseDTO == null)
            {
                return BadRequest("Course cannot be null");
            }

            var validationResult = await _createCourseValidator.ValidateAsync(courseDTO);

            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => e.ErrorMessage));
            }

            var result = await _courseService.AddCourseAsync(courseDTO);
            if (!result)
            {
                return StatusCode(500, "An error occurred while creating the course.");
            }

            return Ok("Course created successfully.");
        }


        [HttpPost("{courseId}/join")]
        public async Task<IActionResult> JoinCourse(Guid courseId, [FromBody] JoinCourseRequestDTO request)
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = "22222222-2222-2222-2222-222222222221";
            if (userId == null)
                return Unauthorized();

            try
            {
                await _courseService.JoinCourseAsync(courseId, Guid.Parse(userId), request.Password);
                return Ok(new { message = "Successfully joined the course." });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message); // 403
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message }); // 400
            }
        }
    }
}
