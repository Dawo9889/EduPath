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
        
     }
}
