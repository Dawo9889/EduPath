using AutoMapper;
using EduPath_backend.Application.DTOs.Assingment;
using EduPath_backend.Domain.Entities;
using EduPath_backend.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.Assignment
{
    public interface IAssignmentService
    {
        Task<bool> AddAssignmentAsync(CreateAssignmentDTO assignmentDTO);
        Task<List<ListAssingmentDTO>> GetAllAssignmentsAsync();
        Task<List<ListAssingmentDTO>> GetAssignmentsByCourse(Guid courseId);
        Task<List<AssignmentUserDetailsDTO>> GetAssignmentByUserId(string userId);
        Task<bool> UpdateAssignmentAsync(Guid AssignmentId, CreateAssignmentDTO assignmentDTO);
        Task<bool> DeleteAssignmentAsync(Guid AssignmentId);
        Task<bool> UploadAssignmentAsync(UploadAssignmentUserDTO assignmentUserDTO);
        Task<ListAssingmentDTO> GetAssignmentByAssignmentId(Guid assignmentId);
    }
}
