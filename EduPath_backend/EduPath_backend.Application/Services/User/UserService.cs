using EduPath_backend.Application.DTOs.User;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.User
{
    public class UserService : IUserService
    {
        private readonly UserManager<Domain.Entities.User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserService(UserManager<Domain.Entities.User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task<bool> CreateUserAsync(CreateUserDTO dto)
        {
            var user = new Domain.Entities.User
            {
                UserName = dto.Email,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                MustChangePassword = true
            };

            var result = await _userManager.CreateAsync(user, dto.TemporaryPassword);

            if (!result.Succeeded)
                return false;

            if (!await _roleManager.RoleExistsAsync(dto.Role))
                await _roleManager.CreateAsync(new IdentityRole(dto.Role));

            await _userManager.AddToRoleAsync(user, dto.Role);

            return true;
        }
    }
}
