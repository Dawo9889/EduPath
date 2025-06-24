using EduPath_backend.Application.DTOs.Assingment;
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
            var assingment = await _context.Assignments.FirstOrDefaultAsync(a => a.AssignmentId == id);
            if (assingment == null){
                return null;
            }
            return assingment;
        }

        public async Task<List<AssignmentUser>> GetAssignmentByUserId(string userId)
        {
            var result = await _context.AssignmentUsers
                .Include(a => a.User)
                .Include(a => a.Assignment)
                .Where(au => au.UserId == userId)
                .Distinct()
                .ToListAsync();

            return result;
        }

        public async Task<bool> UpdateAssignment(Guid assignmentId, Assignment assignment)
        {
            var existingAssignment = await _context.Assignments.FindAsync(assignmentId);
            if (existingAssignment == null)
            {
                return false;
            }
            existingAssignment.CourseId = assignment.CourseId;
            existingAssignment.Name = assignment.Name;
            existingAssignment.Content = assignment.Content;
            existingAssignment.DateStart = assignment.DateStart;
            existingAssignment.DateEnd = assignment.DateEnd;
            existingAssignment.Visible = assignment.Visible;

            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteAssignment(Guid assignmentId)
        {
            var existingAssignment = await _context.Assignments.FirstOrDefaultAsync(x => x.AssignmentId == assignmentId);
            if (existingAssignment == null)
            {
                return false;
            }

            _context.Assignments.Remove(existingAssignment);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
