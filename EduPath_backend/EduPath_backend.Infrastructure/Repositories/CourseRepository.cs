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
                CourseId = courseId,
                UserId = userId.ToString()
            });
            return _context.SaveChangesAsync();
        }

        public async Task<List<Course>> GetAvailableCoursesAsync()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<Course> GetCourseByIdAsync(Guid id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == id);
            if (course == null)
            {
                return null;
            }
            return course;
        }

        public async Task<List<Course>> GetCoursesByUserIdAsync(Guid userId)
        {
            return await _context.CourseUsers
                .Where(cu => cu.UserId == userId.ToString())
                .Select(cu => cu.Course)
                .ToListAsync();
        }

        public async Task<Course?> GetCourseWithUsersAsync(Guid courseId)
        {
            return await _context.Courses
               .Include(c => c.CourseUsers)
               .FirstOrDefaultAsync(c => c.CourseId == courseId);
        }

        public async Task<List<User>> GetListOfAssignedUsers(Guid courseId)
        {
            var users = await _context.CourseUsers
                .Where(cu => cu.CourseId == courseId)
                .Select(cu => cu.User)
                .ToListAsync();

            return users;
        }

        public async Task<bool> IsUserInCourseAsync(Guid courseId, Guid userId)
        {
            return await _context.CourseUsers
                .AnyAsync(cu => cu.CourseId == courseId && cu.UserId == userId.ToString());
        }

        public async Task<bool> UpdateCourseAsync(Guid CourseId, Course updatedCourse)
        {
            var existingCourse = await _context.Courses.FindAsync(CourseId);
            if (existingCourse == null)
            {
                return false;
            }

            existingCourse.Name = updatedCourse.Name;
            existingCourse.Description = updatedCourse.Description;
            existingCourse.IsPublic = updatedCourse.IsPublic;
            existingCourse.PasswordHash = updatedCourse.PasswordHash;

            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteCourseAsync(Guid courseId)
        {
            var course = await _context.Courses.FindAsync(courseId);
            if (course == null)
                return false;

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> IsCourseOwnerAsync(Guid courseId, Guid userId)
        {
            var course = await _context.Courses
                .Include(c => c.CourseUsers)
                .FirstOrDefaultAsync(c => c.CourseId == courseId);

            if (course == null)
            {
                return false;
            }

            return course.CourseUsers.Any(cu => cu.UserId == userId.ToString());
        }
    }
}
