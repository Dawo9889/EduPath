using EduPath_backend.Application.DTOs.Solution;
using EduPath_backend.Application.Services.Solution;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduPath_backend.API.Controllers
{
    [Route("api/solution")]
    [ApiController]
    public class SolutionController : ControllerBase
    {
        private readonly ISolutionService _solutionService;

        public SolutionController(ISolutionService solutionService)
        {
            _solutionService = solutionService;
        }

        [HttpGet("by-assignment/{assignmentId}")]
        public async Task<List<SolutionDetailsDTO>> GetSolutionsByAssignment(Guid assignmentId)
        {
            var solutionsByAssignment = await _solutionService.GetSolutionsByAssignment(assignmentId);
            return solutionsByAssignment;
        }

        [HttpGet("by-user/{userId}")]
        public async Task<List<SolutionDetailsDTO>> GetSolutionsByUser(string userId)
        {
            var solutionsByUser = await _solutionService.GetSolutionsByUser(userId);
            return solutionsByUser;
        }

        [HttpPost("upload-solution")]
        public async Task<IActionResult> UploadSolution([FromForm] CreateSolutionDTO solutionDTO)
        {
            var allowedExtensions = new[] { ".pdf", ".docx", ".txt", ".zip" };
            var maxFileSize = 10 * 1024 * 1024; //10MB

            var fileExtension = Path.GetExtension(solutionDTO.File.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(fileExtension))
            {
                return BadRequest("Unsupported file type. Allowed: .pdf, .docx, .txt, .zip");
            }

            if (solutionDTO.File.Length > maxFileSize)
                return BadRequest("File size exceeds the 10 MB limit.");

            var basePath = Environment.GetEnvironmentVariable("COURSES_BASE_PATH")
                ?? Path.Combine(Directory.GetCurrentDirectory(), "courses_files");

            var targetDirectory = Path.Combine(basePath, solutionDTO.CourseId, solutionDTO.AssignmentId.ToString(), solutionDTO.UserId);
            solutionDTO.Filename = Path.Combine(targetDirectory, solutionDTO.File.FileName.ToString());

            if (!Directory.Exists(targetDirectory))
                Directory.CreateDirectory(targetDirectory);

            var fileName = Path.GetFileName(solutionDTO.Filename);
            var fullPath = Path.Combine(targetDirectory, fileName);

            if (System.IO.File.Exists(fullPath))
            {
                return Conflict("A file with the same name already exists.");
            }

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await solutionDTO.File.CopyToAsync(stream);
            }

            solutionDTO.DateSubmitted = DateTime.UtcNow;

            var result = await _solutionService.CreateSolution(solutionDTO);
            if (result)
                return Ok("File was successfully uploaded");

            return BadRequest("Something went wrong while uploading file");
        }
    }
}
