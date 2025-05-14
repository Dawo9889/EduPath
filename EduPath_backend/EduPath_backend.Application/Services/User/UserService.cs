using AutoMapper;
using EduPath_backend.Application.DTOs.User;
using EduPath_backend.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.User
{
    public class UserService : IUserService
    {
        private readonly UserManager<Domain.Entities.User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(UserManager<Domain.Entities.User> userManager, RoleManager<IdentityRole> roleManager, IUserRepository userRepository, IMapper mapper, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _userRepository = userRepository;
            _mapper = mapper;
            _configuration = configuration;
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




            var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var emailConfirmToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var resetLink = $"https://twoja-apka/reset-password?userId={user.Id}" +
                            $"&resetToken={passwordResetToken}" +
                            $"&emailToken={emailConfirmToken}";
            // Tymczasowy log:
            Console.WriteLine("UserId: " + user.Id);
            Console.WriteLine("Password Reset Tokne: " + passwordResetToken);
            Console.WriteLine("Email Confirm Token: " + emailConfirmToken);
            Console.WriteLine("RESET LINK: " + resetLink);
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
        public async Task<bool> CompleteRegistrationAsync(CompleteRegistrationDTO request)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            if (user == null)
                return false;

            var confirmResult = await _userManager.ConfirmEmailAsync(user, request.EmailToken);
            if (!confirmResult.Succeeded)
                return false;

            var resetResult = await _userManager.ResetPasswordAsync(user, request.ResetToken, request.NewPassword);
            if (!resetResult.Succeeded)
                return false;



            user.MustChangePassword = false;
            await _userManager.UpdateAsync(user);

            return true;
        }

        public async Task<(bool Success, LoginResponseDTO Response, string ErrorMessage)> LoginAsync(LoginDTO request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
                return (false, null, "Invalid email or password.");


            if (!await _userManager.IsEmailConfirmedAsync(user))
                return (false, null, "Email not confirmed.");

            var accessToken = await GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            var response = new LoginResponseDTO
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresIn = 3600
            };

            return (true, response, null);
        }




        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);


            var base64String = Convert.ToBase64String(randomNumber);


            return base64String
                .Replace('+', '-')
                .Replace('/', '_')
                .TrimEnd('=');
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
        private async Task<string> GenerateJwtToken(Domain.Entities.User user)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            var roles = await _userManager.GetRolesAsync(user); 
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var jwtSettings = _configuration.GetSection("Jwt");
            var secretKey = jwtSettings["Key"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
