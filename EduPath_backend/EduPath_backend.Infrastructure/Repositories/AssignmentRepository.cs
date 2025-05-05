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
    public class AssignmentRepository : IAssignmentRepository
    {
        private readonly ApplicationDbContext _context;

        public AssignmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddAssignment(Assignment assignment)
        {
            _context.Assignments.Add(assignment);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<List<Assignment>> GetAllAssignments()
        {
            return await _context.Assignments.ToListAsync();
        }

        public async Task<List<Assignment>> GetAllAssignmentsByCourse(Guid CourseId)
        {
            return await _context.Assignments
                .Where(co =>  co.CourseId == CourseId)
                .ToListAsync();
        }

        public async Task<Assignment> GetAssignmentById(Guid id)
        {
            var assingment = await _context.Assignments.FirstOrDefaultAsync(a => a.Id_Assignment == id);
            if (assingment == null){
                return null;
            }
            return assingment;
        }
    }
}
