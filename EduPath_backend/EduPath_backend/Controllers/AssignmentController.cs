using EduPath_backend.Application.DTOs.Assingment;
using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Application.DTOs.User;
using EduPath_backend.Application.Services.Assignment;
using EduPath_backend.Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduPath_backend.API.Controllers
{
    [Route("api/assingment")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly IAssignmentService _assignmentService;
        private readonly IValidator<CreateAssignmentDTO> _createAssignmentValidator;

        public AssignmentController(IAssignmentService assignmentService, IValidator<CreateAssignmentDTO> createAssignmentValidator)
        {
            _assignmentService = assignmentService;
            _createAssignmentValidator = createAssignmentValidator;
        }
        [HttpGet("all")]
        public async Task<List<ListAssingmentDTO>> GetAllAssingments()
        {
            var assingments = await _assignmentService.GetAllAssignmentsAsync();
            return assingments;
        }

        [HttpGet("by-course/{courseId}")]
        public async Task<List<ListAssingmentDTO>> GetAllAssingmentsByCourse(Guid courseId)
        {
            var assingmentsByCourse = await _assignmentService.GetAssignmentsByCourse(courseId);
            return assingmentsByCourse;
        }

        [HttpGet("by-user/{userId}")]
        public async Task<List<AssignmentUserDetailsDTO>> GetAllAssingmentsByUser(string userId)
        {
            var assingmentsByUser = await _assignmentService.GetAssignmentByUserId(userId);
            return assingmentsByUser;
        }

        [HttpGet("{assignmentId}")]
        public async Task<ListAssingmentDTO> GetAssignmentById(Guid assignmentId) 
        {
            var assignment = await _assignmentService.GetAssignmentByAssignmentId(assignmentId);
            return assignment;
        }

        [HttpPost("create")]

        public async Task<IActionResult> AddAssignment([FromBody] CreateAssignmentDTO assignmentDTO)
        {
            if (assignmentDTO == null)
            {
                return BadRequest("Assignment cannot be null");
            }

            var validationResult = await _createAssignmentValidator.ValidateAsync(assignmentDTO);

            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => e.ErrorMessage));
            }

            var result = await _assignmentService.AddAssignmentAsync(assignmentDTO);
            if (!result)
            {
                return StatusCode(500, "An error occurred while creating the assignment.");
            }

            return Ok("Assignment created successfully.");
        }

        [HttpPut("update/{AssignmentId}")]
        public async Task<IActionResult> UpdateAssignment(Guid AssignmentId, [FromBody] CreateAssignmentDTO updateAssignmentDTO)
        {
            var validationResult = await _createAssignmentValidator.ValidateAsync(updateAssignmentDTO);

            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => e.ErrorMessage));
            }
            try
            {
                await _assignmentService.UpdateAssignmentAsync(AssignmentId, updateAssignmentDTO);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{AssignmentId}")]
        public async Task<IActionResult> DeleteAssignment(Guid AssignmentId)
        {
            var assignment = await _assignmentService.GetAssignmentByAssignmentId(AssignmentId);
            var basePath = Environment.GetEnvironmentVariable("COURSES_BASE_PATH")
                ?? Path.Combine(Directory.GetCurrentDirectory(), "courses_files");

            var pathToDelete = Path.Combine(basePath, assignment.CourseId.ToString(), AssignmentId.ToString());

            if (Directory.Exists(pathToDelete))
            {
                {
                    Directory.Delete(pathToDelete, recursive: true);
                }
            }

            var result = await _assignmentService.DeleteAssignmentAsync(AssignmentId);

            if (result)
            {
                return Ok("Assignment with files was removed");
            }

            return NotFound("Assignment not found");
        }
    }
}
