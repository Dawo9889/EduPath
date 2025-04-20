using EduPath_backend.Application.Services.Course;
using EduPath_backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EduPath_backend.API.Controllers
{

    [Route("api/course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)   
        {
            _courseService = courseService;
        }


        //Gets

        [HttpGet("all")]
        public async Task<List<Course>> GetAllCourses()
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

        //Post
        [HttpPost("add")]
        public async Task<IActionResult> AddCourse([FromBody] Course course)
        {
            if (course == null)
            {
                return BadRequest("Course cannot be null");
            }

            
            var result = await _courseService.AddCourseAsync(course);
            if (!result)
            {
                return BadRequest("Failed to add course");
            }

            return CreatedAtAction(nameof(GetCourseById), new { id = course.Id_Course }, course);
        }
    }
}
