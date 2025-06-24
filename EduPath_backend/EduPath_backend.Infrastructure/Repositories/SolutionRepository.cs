using EduPath_backend.Domain.Entities;
using EduPath_backend.Domain.Interfaces;
using EduPath_backend.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Infrastructure.Repositories
{
    public class SolutionRepository : ISolutionRepository
    {
        private readonly ApplicationDbContext _context;
        public SolutionRepository(ApplicationDbContext context) 
        { 
            _context = context; 
        }

        public async Task<List<AssignmentUser>> GetSolutionsByAssignment(Guid assignmentId)
        {
            return await _context.AssignmentUsers
                .Where(au => au.AssignmentId == assignmentId)
                .ToListAsync();
        }

        public async Task<List<AssignmentUser>> GetSolutionsByUser(string userId)
        {
            return await _context.AssignmentUsers
                .Where(au => au.UserId == userId)
                .ToListAsync();
        }

        public async Task<AssignmentUser> GetSolution(Guid id)
        {
            var solution = await _context.AssignmentUsers
                .Include(au => au.Assignment)
                .FirstOrDefaultAsync(au => au.Id == id);
            return solution ?? null;
        }

        public async Task<bool> CreateSolution(AssignmentUser assignmentUser)
        {
            bool alreadyAssigned = await _context.AssignmentUsers
                .AnyAsync(cu => cu.AssignmentId == assignmentUser.AssignmentId && cu.UserId == assignmentUser.UserId && cu.Filepath == assignmentUser.Filepath);

            if (alreadyAssigned)
            {
                return false;
            }

            _context.AssignmentUsers.Add(assignmentUser);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }


    }
}
