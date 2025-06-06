using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EduPath_backend.Domain.Entities;
using EduPath_backend.Domain.Interfaces;
using EduPath_backend.Infrastructure.Persistance;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EduPath_backend.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AssignUserToCourse(CourseUser courseUser)
        {
            bool alreadyAssigned = await _context.CourseUsers
                .AnyAsync(cu => cu.CourseId == courseUser.CourseId && cu.UserId == courseUser.UserId);

            if (alreadyAssigned)
            {
                return false;
            }

            _context.CourseUsers.Add(courseUser);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
        public async Task<List<User>> GetListOfAllUsers()
        {
            var users = await _context.Users
                .ToListAsync();

            return users;
        }

        public async Task<Dictionary<string, string>> GetUserRolesAsync()
        {
            var roles = await (
                from userRole in _context.UserRoles
                join role in _context.Roles on userRole.RoleId equals role.Id
                select new { userRole.UserId, role.Name }
            ).ToListAsync();

            return roles.ToDictionary(r => r.UserId, r => r.Name);
        }

        public async Task<bool> DeleteUserFromCourse(CourseUser courseUser)
        {
            bool isExisting = await _context.CourseUsers
                .AnyAsync(cu => cu.CourseId == courseUser.CourseId && cu.UserId == courseUser.UserId);

            if (isExisting)
            {
                _context.CourseUsers.Remove(courseUser);
                var result = await _context.SaveChangesAsync();
                return result > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DeleteUser(string userId)
        {
            var users = await _context.Users.ToListAsync();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user != null)
            {
                _context.Users.Remove(user);
                var result = await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
