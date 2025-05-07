using AutoMapper;
using EduPath_backend.Application.DTOs.Assingment;
using EduPath_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Mappings
{
    public class AssignmentMappingProfile : Profile
    {
        public AssignmentMappingProfile()
        {
            CreateMap<Assignment, ListAssingmentDTO>();
            CreateMap<ListAssingmentDTO, Assignment>();
            CreateMap<CreateAssignmentDTO,Assignment>();
            CreateMap<Assignment, CreateAssignmentDTO>();

            CreateMap<AssignmentUser, AssignmentUserDTO>()
                .ForMember(dest => dest.AssignmentName, opt => opt.MapFrom(src => ((AssignmentUser)src).Assignment.Name))
                .ForMember(dest => dest.AssignmentContent, opt => opt.MapFrom(src => ((AssignmentUser)src).Assignment.Content))
                .ForMember(dest => dest.UserEmail, opt => opt.MapFrom(src => ((AssignmentUser)src).User.Email));
        }
    }
}
