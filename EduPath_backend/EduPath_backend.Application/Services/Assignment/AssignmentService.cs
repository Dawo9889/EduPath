using AutoMapper;
using EduPath_backend.Application.DTOs.Assingment;
using EduPath_backend.Application.DTOs.Course;
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

        public async Task<List<ListAssingmentDTO>> GetAllAssingmentsAsync()
        {
            var assignments = await _assignmentRepository.GetAllAssignments();

            var listAssignmentsDTOs = _mapper.Map<List<ListAssingmentDTO>>(assignments);
            return listAssignmentsDTOs;
        }
    }
}
