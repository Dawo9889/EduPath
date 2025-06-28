using EduPath_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Interfaces
{
    public interface ISolutionRepository
    {
        Task<List<AssignmentUser>> GetSolutionsByAssignment(Guid assignmentId);
        Task<List<AssignmentUser>> GetSolutionsByUser(string userId);
        Task<AssignmentUser> GetSolution(Guid assignmentId);
        Task<bool> CreateSolution(AssignmentUser assignmentUser);
        Task<bool> GradeSolution(Guid assignmentUserId, int grade);
    }
}
