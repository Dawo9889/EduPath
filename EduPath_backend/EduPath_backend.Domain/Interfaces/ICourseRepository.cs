using EduPath_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Interfaces
{
    public interface ICourseRepository
    {
        Task<bool> AddCourseAsync(Course newCourse);
        Task<List<Course>> GetAvailableCoursesAsync();
        Task<Course> GetCourseByIdAsync(Guid id);

        Task<Course?> GetCourseWithUsersAsync(Guid courseId);

        Task<bool> IsUserInCourseAsync(Guid courseId, string userId);

        Task AddUserToCourseAsync(Guid courseId, string userId);

        Task<List<User>> GetListOfAssignedUsers(Guid courseId);

        Task<bool> UpdateCourseAsync(Guid CourseId, Course updatedCourse);

        Task<List<Course>> GetCoursesByUserIdAsync(string userId);

        Task<bool> DeleteCourseAsync(Guid courseId);

        Task<bool> IsCourseOwnerAsync(Guid courseId, string userId);
        Task<List<Course>> GetCoursesByOwnerIdAsync(string ownerId);

    }
}
