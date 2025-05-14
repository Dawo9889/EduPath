using AutoMapper;
using EduPath_backend.Application.DTOs.User;
using EduPath_backend.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(UserManager<Domain.Entities.User> userManager, RoleManager<IdentityRole> roleManager, IUserRepository userRepository, IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<bool> AssignUserToCourseAsync(UserCourseDTO userCourseDTO)
        {
            var userCourse = new Domain.Entities.CourseUser
            {
                UserId = userCourseDTO.userID,
                CourseId = userCourseDTO.courseID
            };

            var result = await _userRepository.AssignUserToCourse(userCourse);

            if (result)
            {
                return true;
            }
            else
            {
                throw new Exception("User is currently assigned to this course.");
            }
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

        public async Task<bool> DeleteUserFromCourseAsync(UserCourseDTO userCourseDTO)
        {
            var userCourse = new Domain.Entities.CourseUser
            {
                UserId = userCourseDTO.userID,
                CourseId = userCourseDTO.courseID
            };

            var result = await _userRepository.DeleteUserFromCourse(userCourse);

            if (result)
            {
                return true;
            }
            else
            {
                throw new Exception("User was not assigned to this course");
            }
        }

        public async Task<List<ListOfUsersDTO>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetListOfAllUsers();
            var userRoles = await _userRepository.GetUserRolesAsync();

            var result = users.Select(user => new ListOfUsersDTO
            {
                UserId = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = userRoles.TryGetValue(user.Id, out var role) ? role : "No Role"
            }).ToList();

            return result;
        }

        public async Task<List<ListOfUsersDTO>> GetUsersByRoleAsync(string roleName)
        {
            var users = await _userRepository.GetListOfAllUsers();
            var userRoles = await _userRepository.GetUserRolesAsync();

            var filteredUsers = users
                .Where(user => userRoles.TryGetValue(user.Id, out var role) && role.Equals(roleName, StringComparison.OrdinalIgnoreCase))
                .Select(user => new ListOfUsersDTO
                {
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = userRoles[user.Id]
                })
                .ToList();

            return filteredUsers;
        }

    }
}
