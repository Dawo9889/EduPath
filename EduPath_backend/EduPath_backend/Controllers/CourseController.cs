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
    }
}
