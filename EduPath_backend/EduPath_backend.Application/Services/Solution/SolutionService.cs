using AutoMapper;
using EduPath_backend.Application.DTOs.Assingment;
using EduPath_backend.Application.DTOs.Solution;
using EduPath_backend.Domain.Entities;
using EduPath_backend.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.Solution
{
    public class SolutionService : ISolutionService
    {
        private readonly ISolutionRepository _solutionRepository;
        private readonly IMapper _mapper;

        private readonly string _coursesBasePath;

        public SolutionService(ISolutionRepository solutionRepository, IMapper mapper)
        {
            _solutionRepository = solutionRepository;
            _mapper = mapper;

            _coursesBasePath = Environment.GetEnvironmentVariable("COURSES_BASE_PATH")
                ?? Path.Combine(Directory.GetCurrentDirectory(), "courses_files");
        }

        public async Task<SolutionDetailsDTO> GetSolution(Guid solutionId)
        {
            var solution = await _solutionRepository.GetSolution(solutionId);
            var solutionDTO = _mapper.Map<SolutionDetailsDTO>(solution);
            return solutionDTO;
        }

        public async Task<List<SolutionDetailsDTO>> GetSolutionsByAssignment(Guid assignmentId)
        {
            var solutions = await _solutionRepository.GetSolutionsByAssignment(assignmentId);
            var solutionDTOs = _mapper.Map<List<SolutionDetailsDTO>>(solutions);
            return solutionDTOs;
        }

        public async Task<List<SolutionDetailsDTO>> GetSolutionsByUser(string userId)
        {
            var solutions = await _solutionRepository.GetSolutionsByUser(userId);
            var solutionDTOs = _mapper.Map<List<SolutionDetailsDTO>>(solutions);
            return solutionDTOs;
        }

        public async Task<bool> CreateSolution(CreateSolutionDTO createSolutionDTO)
        {
            var assignmentUser = new AssignmentUser
            {
                AssignmentId = createSolutionDTO.AssignmentId,
                UserId = createSolutionDTO.UserId,
                DateSubmitted = createSolutionDTO.DateSubmitted,
                Filepath = Path.Combine(_coursesBasePath, createSolutionDTO.CourseId, (createSolutionDTO.AssignmentId).ToString(), createSolutionDTO.UserId, createSolutionDTO.Filename)
            };
            var result = await _solutionRepository.CreateSolution(assignmentUser);

            if (result)
            {
                return true;
            }
            else
            {
                throw new Exception("Sth went wrong");
            }
        }

        public async Task<bool> GradeSolution(Guid solutionId, int grade)
        {
            var result = await _solutionRepository.GradeSolution(solutionId, grade);
            if (result)
            {
                return true;
            }
            else
            {
                throw new Exception("Sth went wrong");
            }
        }
    }
}
