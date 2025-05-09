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

        private readonly string _coursesBasePath;

        public AssignmentService(IAssignmentRepository assignmentRepository, IMapper mapper)
        {
            _assignmentRepository = assignmentRepository;
            _mapper = mapper;

            _coursesBasePath = Environment.GetEnvironmentVariable("COURSES_BASE_PATH")
                ?? Path.Combine(Directory.GetCurrentDirectory(), "courses_files");
        }

        public async Task<bool> AddAssignmentAsync(CreateAssignmentDTO assignmentDTO)
        {
            var assignmentEntity = _mapper.Map<Domain.Entities.Assignment>(assignmentDTO);
            var result = await _assignmentRepository.AddAssignment(assignmentEntity);
            if (result)
            {
                var assignmentFolderPath = Path.Combine(_coursesBasePath, assignmentEntity.CourseId.ToString(), assignmentEntity.Id_Assignment.ToString());

                if (!Directory.Exists(assignmentFolderPath))
                {
                    Directory.CreateDirectory(assignmentFolderPath);
                }
                else
                {
                    throw new Exception("Assignment folder already exists.");
                }

                return result;
            }
            else
            {
                throw new Exception("Failed to create assignment.");
            }
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

        public async Task<bool> DeleteAssignmentAsync(Guid AssignmentId)
        {
            var existingAssignment = await _assignmentRepository.GetAssignmentById(AssignmentId);
            if (existingAssignment == null)
            {
                return false;
            }
            var result = await _assignmentRepository.DeleteAssignment(AssignmentId);
            return result;
        }
    }
}
