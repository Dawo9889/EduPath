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

        [HttpPost("upload-assignment")]
        public async Task<IActionResult> UploadAssignment([FromForm] UploadAssignmentUserDTO assignmentUserDTO)
        {
            var allowedExtensions = new[] { ".pdf", ".docx", ".txt", ".zip" };
            var maxFileSize = 10 * 1024 * 1024; //10MB

            var fileExtension = Path.GetExtension(assignmentUserDTO.File.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(fileExtension))
            {
                return BadRequest("Unsupported file type. Allowed: .pdf, .docx, .txt, .zip");
            }

            if (assignmentUserDTO.File.Length > maxFileSize)
                return BadRequest("File size exceeds the 10 MB limit.");

            var basePath = Environment.GetEnvironmentVariable("COURSES_BASE_PATH")
                ?? Path.Combine(Directory.GetCurrentDirectory(), "courses_files");

            var targetDirectory = Path.Combine(basePath, assignmentUserDTO.CourseId,assignmentUserDTO.AssignmentId.ToString(), assignmentUserDTO.UserId);
            assignmentUserDTO.Filename = Path.Combine(targetDirectory, assignmentUserDTO.File.FileName.ToString());

            if (!Directory.Exists(targetDirectory))
                Directory.CreateDirectory(targetDirectory);

            var fileName = Path.GetFileName(assignmentUserDTO.Filename);
            var fullPath = Path.Combine(targetDirectory, fileName);

            if (System.IO.File.Exists(fullPath))
            {
                return Conflict("A file with the same name already exists.");
            }

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await assignmentUserDTO.File.CopyToAsync(stream);
            }

            assignmentUserDTO.DateSubmitted = DateTime.UtcNow;
            
            var result = await _assignmentService.UploadAssignmentAsync(assignmentUserDTO);
            if (result)
                return Ok("File was successfully uploaded");

            return BadRequest("Something went wrong while uploading file");
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
