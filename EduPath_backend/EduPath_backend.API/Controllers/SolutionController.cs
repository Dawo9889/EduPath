using EduPath_backend.Application.DTOs.Solution;
using EduPath_backend.Application.Services.Solution;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;

namespace EduPath_backend.API.Controllers
{
    [Route("api/solution")]
    [ApiController]
    [Authorize]
    public class SolutionController : ControllerBase
    {
        private readonly ISolutionService _solutionService;

        public SolutionController(ISolutionService solutionService)
        {
            _solutionService = solutionService;
        }

        [HttpGet("by-assignment/{assignmentId}")]
        [Authorize(Roles = "Admin,Lecturer")]
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

        [HttpGet("download/{solutionId}")]
        public async Task<IActionResult> DownloadSolution(Guid solutionId)
        {
            var solutionDTO = await _solutionService.GetSolution(solutionId);

            if (solutionDTO == null || !System.IO.Path.Exists(solutionDTO.Filepath))
            {
                return NotFound();
            }

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(solutionDTO.Filepath, out var contentType))
            {
                contentType = "application/octet-stream"; // Default fallback
            }

            var fileName = Path.GetFileName(solutionDTO.Filepath);
            return PhysicalFile(solutionDTO.Filepath, contentType, fileName);
        }

        [HttpGet("download-by-assignment/{assignmentId}")]
        [Authorize(Roles = "Admin,Lecturer")]
        public async Task<IActionResult> DownloadAllSolutions(Guid assignmentId)
        {
            var solutions = await _solutionService.GetSolutionsByAssignment(assignmentId);

            if (solutions == null || solutions.Count == 0)
                return NotFound("No solutions found for this assignment.");

            var tempZipFilePath = Path.GetTempFileName();
            var zipFileName = $"assignment_{assignmentId}_solutions.zip";

            try
            {
                using (var zipArchive = ZipFile.Open(tempZipFilePath, ZipArchiveMode.Update))
                {
                    foreach (var solution in solutions)
                    {
                        if (!System.IO.File.Exists(solution.Filepath))
                            continue;

                        var entryName = Path.GetFileName(solution.Filepath);
                        zipArchive.CreateEntryFromFile(solution.Filepath, entryName);
                    }
                }

                var contentType = "application/zip";
                var fileBytes = await System.IO.File.ReadAllBytesAsync(tempZipFilePath);
                return File(fileBytes, contentType, zipFileName);
            }
            finally
            {
                if (System.IO.File.Exists(tempZipFilePath))
                    System.IO.File.Delete(tempZipFilePath);
            }
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

        [HttpPost("grade/{solutionId}")]
        [Authorize(Roles = "Lecturer")]
        public async Task<IActionResult> GradeSolution(Guid solutionId, int grade)
        {
            if (grade < 2 || grade > 5)
            {
                return BadRequest("Grade has to be an integer between 2 and 5.");
            }
            try
            {
                await _solutionService.GradeSolution(solutionId, grade);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
