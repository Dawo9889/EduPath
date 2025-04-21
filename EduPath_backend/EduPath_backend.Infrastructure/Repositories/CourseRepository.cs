using EduPath_backend.Domain.Entities;
using EduPath_backend.Domain.Interfaces;
using EduPath_backend.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Infrastructure.Repositories
{
    public class CourseRepository : ICourseRepository
    {

        private readonly ApplicationDbContext _context;
        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddCourseAsync(Course newCourse)
        {
            _context.Courses.Add(newCourse);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public Task AddUserToCourseAsync(Guid courseId, Guid userId)
        {
            _context.CourseUsers.Add(new CourseUser
            {
                Id_Course = courseId,
                Id_User = userId
            });
            return _context.SaveChangesAsync();
        }

        public async Task<List<Course>> GetAvailableCoursesAsync()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<Course> GetCourseByIdAsync(Guid id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id_Course == id);
            if (course == null)
            {
                return null;
            }
            return course;
        }

        public async Task<Course?> GetCourseWithUsersAsync(Guid courseId)
        {
            return await _context.Courses
               .Include(c => c.CourseUsers)
               .FirstOrDefaultAsync(c => c.Id_Course == courseId);
        }

        public async Task<bool> IsUserInCourseAsync(Guid courseId, Guid userId)
        {
            return await _context.CourseUsers
                .AnyAsync(cu => cu.Id_Course == courseId && cu.Id_User == userId);
        }
    }
}
