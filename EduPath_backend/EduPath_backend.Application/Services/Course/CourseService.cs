using EduPath_backend.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.Course
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;


        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public Task<List<Domain.Entities.Course>> GetAvailableCoursesAsync()
        {
           var courses = _courseRepository.GetAvailableCoursesAsync();
           return courses;
        }
    }
}
