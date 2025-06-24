using AutoMapper;
using EduPath_backend.Application.DTOs.Solution;
using EduPath_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Mappings
{
    public class SolutionMappingProfile : Profile
    {
        public SolutionMappingProfile() 
        {
            CreateMap<AssignmentUser, SolutionDetailsDTO>();
        }
    }
}
