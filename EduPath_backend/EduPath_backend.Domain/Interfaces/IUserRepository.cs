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
        Task <bool> DeleteUser(string userId);
        Task<List<User>> GetListOfAllUsers();
        Task<Dictionary<string, string>> GetUserRolesAsync();
        Task<bool> CheckIfUserExistsByMail(string email);
        Task<User> EditUserAsync(User editedUser);
    }
}
