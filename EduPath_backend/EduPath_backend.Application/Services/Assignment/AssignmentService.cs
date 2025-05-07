using AutoMapper;
using EduPath_backend.Application.DTOs.Assingment;
using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Domain.Entities;
using EduPath_backend.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.Assignment
{
    public class AssignmentService : IAssignmentService
    {
        private readonly IAssignmentRepository _assignmentRepository;
        private readonly IMapper _mapper;

        public AssignmentService(IAssignmentRepository assignmentRepository, IMapper mapper)
        {
            _assignmentRepository = assignmentRepository;
            _mapper = mapper;
        }

        public async Task<bool> AddAssignmentAsync(CreateAssignmentDTO assignmentDTO)
        {
            var courseEntity = _mapper.Map<Domain.Entities.Assignment>(assignmentDTO);
            var result = await _assignmentRepository.AddAssignment(courseEntity);
            return result;
        }

        public async Task<List<ListAssingmentDTO>> GetAllAssignmentsAsync()
        {
            var assignments = await _assignmentRepository.GetAllAssignments();
            var listAssignmentsDTOs = _mapper.Map<List<ListAssingmentDTO>>(assignments);
            return listAssignmentsDTOs;
        }

        public async Task<List<ListAssingmentDTO>> GetAssignmentsByCourse(Guid courseId)
        {
            var assignmentsByCourse = await _assignmentRepository.GetAllAssignmentsByCourse(courseId);

            var assignmentsByCourseDTO = _mapper.Map<List<ListAssingmentDTO>>(assignmentsByCourse);
            return assignmentsByCourseDTO;
        }

        public async Task<List<AssignmentUserDTO>> GetAssignmentByUserId(string userId)
        {
            var assignmentByUser = await _assignmentRepository.GetAssignmentByUserId(userId);

            var assignmentByUserDTO = _mapper.Map<List<AssignmentUserDTO>>(assignmentByUser);
            return assignmentByUserDTO;
        }

        public async Task<bool> UpdateAssignmentAsync(Guid AssignmentId, CreateAssignmentDTO assignmentDTO)
        {
            var existingAssignment = await _assignmentRepository.GetAssignmentById(AssignmentId);
            if (existingAssignment == null)
            {
                throw new Exception("Course not found");
            }
            existingAssignment.CourseId = assignmentDTO.CourseId;
            existingAssignment.Name = assignmentDTO.Name;
            existingAssignment.Content = assignmentDTO.Content;
            existingAssignment.Date_start = assignmentDTO.Date_start;
            existingAssignment.Date_end = assignmentDTO.Date_end;
            existingAssignment.Visible = assignmentDTO.Visible;

            var result = await _assignmentRepository.UpdateAssignment(AssignmentId, existingAssignment);

            return result;
        }
    }
}
