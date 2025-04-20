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

        public Task<bool> AddCourseAsync(Domain.Entities.Course course)
        {
            var newCourse = new Domain.Entities.Course
            {
                Id_Course = course.Id_Course,
                Name = course.Name,
                Description = course.Description,
            };
            return _courseRepository.AddCourseAsync(newCourse);
        }

        public async Task<List<Domain.Entities.Course>> GetAvailableCoursesAsync()
        {
           var courses = await _courseRepository.GetAvailableCoursesAsync();
           return courses;
        }

        public async Task<Domain.Entities.Course> GetCourseByIdAsync(Guid id)
        {
            var course = await _courseRepository.GetCourseByIdAsync(id);
            return course;
        }
    }
}
