using EduPath_backend.Application.DTOs.Solution;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.Solution
{
    public interface ISolutionService
    {
        Task<List<SolutionDetailsDTO>> GetSolutionsByAssignment(Guid assignmentId);
        Task<List<SolutionDetailsDTO>> GetSolutionsByUser(string userId);
        Task<SolutionDetailsDTO> GetSolution(Guid solutionId);
        Task<bool> CreateSolution(CreateSolutionDTO uploadSolutionDTO);
        Task<bool> GradeSolution(Guid solutionId, int grade);
    }
}
