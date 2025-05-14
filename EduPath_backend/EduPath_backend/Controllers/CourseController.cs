using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Application.Services.Course;
using EduPath_backend.Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EduPath_backend.API.Controllers
{

    [Route("api/course")]
    [ApiController]
    [Authorize]
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
        [Authorize(Roles = "Admin")]
        public async Task<List<ListCourseDTO>> GetAllCourses()
        {
            var courses = await _courseService.GetAvailableCoursesAsync();
            return courses;
        }

        [HttpGet("{id}")]

        public async Task<CourseDetailsDTO> GetCourseById(Guid id)
        {
            var courseDTO = await _courseService.GetCourseByIdAsync(id);
            return courseDTO;
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


        [HttpGet("user/{userId}")] // Retrieve all courses a specific user is enrolled in.
        public async Task<IActionResult> GetCoursesByUserId(string userId)
        {
            var courses = await _courseService.GetCoursesByUserIdAsync(userId);
            return Ok(courses);
        }

        //Post
        [HttpPost("create")]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> AddCourse([FromBody] CreateCourseDTO courseDTO)
        {
            if (courseDTO == null)
            {
                return BadRequest("Course cannot be null");
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            courseDTO.OwnerId = userId;

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
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            try
            {
                await _courseService.JoinCourseAsync(courseId, request.Password, userId);
                return Ok(new { message = "Successfully joined the course." });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        // Puts
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> UpdateCourse(Guid id, [FromBody] CreateCourseDTO dto)
        {
            var validationResult = await _createCourseValidator.ValidateAsync(dto);
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            dto.OwnerId = userId;
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => e.ErrorMessage));
            }
            try
            {
                await _courseService.UpdateCourseAsync(id, dto, userId);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }



        //Deletes
        [HttpDelete("{id}")]

        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> DeleteCourse(Guid id)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                await _courseService.DeleteCourseAsync(id, userId);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
        //[HttpDelete("{courseId}/users/{userId}")]
        //public async Task<IActionResult> RemoveStudentFromCourse(Guid courseId, string userId)
        //{
        //    // Simulate getting the course owner's ID (replace with actual logic to get the current user ID)
        //    var ownerId = "5a347d1e-81f5-4493-81ab-a79b15ffa2d4"; // Example owner ID
        //    if (ownerId == null)
        //        return Unauthorized();

        //    try
        //    {
        //        // Check if the current user is the owner of the course
        //        var isOwner = await _courseService.IsCourseOwnerAsync(courseId, Guid.Parse(ownerId));
        //        if (!isOwner)
        //        {
        //            return Forbid("You are not authorized to remove students from this course.");
        //        }

        //        // Remove the student from the course
        //        await _courseService.RemoveStudentFromCourseAsync(courseId, userId);
        //        return Ok(new { message = "Student removed from the course successfully." });
        //    }
        //    catch (KeyNotFoundException ex)
        //    {
        //        return NotFound(new { message = ex.Message });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { error = ex.Message });
        //    }
        //}

    }
}
