using EduPath_backend.Application.DTOs.Assingment;
using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Application.Services.Assignment;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

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
            var assingments = await _assignmentService.GetAllAssingmentsAsync();
            return assingments;
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
    }
}
