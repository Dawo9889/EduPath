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
        Task<bool> IsUserInCourseAsync(Guid courseId, Guid userId);
        Task AddUserToCourseAsync(Guid courseId, Guid userId);

        Task<List<User>> GetListOfAssignedUsers(Guid courseId);
    }
}
