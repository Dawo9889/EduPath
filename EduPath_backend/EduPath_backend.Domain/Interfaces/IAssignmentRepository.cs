using EduPath_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Interfaces
{
    public interface IAssignmentRepository
    {
        Task<bool> AddAssignment(Assignment assignment);
        Task<Assignment> GetAssignmentById(Guid id);
        Task<List<Assignment>> GetAllAssignmentsByCourse(Guid CourseId);
        Task<List<Assignment>> GetAllAssignments();
        Task<List<AssignmentUser>> GetAssignmentByUserId(string userId);

    }
}
