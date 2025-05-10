using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EduPath_backend.Domain.Entities;
using EduPath_backend.Domain.Interfaces;
using EduPath_backend.Infrastructure.Persistance;
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
    }
}
