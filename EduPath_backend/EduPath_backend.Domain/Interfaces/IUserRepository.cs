using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EduPath_backend.Domain.Entities;

namespace EduPath_backend.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> AssignUserToCourse(CourseUser courseUser);
        Task<bool> DeleteUserFromCourse(CourseUser courseUser);
        Task<List<User>> GetListOfAllUsers();
        Task<Dictionary<string, string>> GetUserRolesAsync();
    }
}
