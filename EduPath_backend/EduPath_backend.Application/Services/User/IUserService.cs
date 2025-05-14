using EduPath_backend.Application.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.User
{
    public interface IUserService
    {
        Task<bool> CreateUserAsync(CreateUserDTO dto);
        Task<bool> AssignUserToCourseAsync(UserCourseDTO dto);
        Task<bool> DeleteUserFromCourseAsync(UserCourseDTO dto);

        Task<(bool Success, LoginResponseDTO Response, string ErrorMessage)> LoginAsync(LoginDTO request);
        Task<bool> CompleteRegistrationAsync(CompleteRegistrationDTO request);
        Task<List<ListOfUsersDTO>> GetAllUsersAsync();
        Task<List<ListOfUsersDTO>> GetUsersByRoleAsync(string roleName);
    }
}
