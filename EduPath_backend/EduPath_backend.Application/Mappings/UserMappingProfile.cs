using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EduPath_backend.Application.DTOs.User;
using EduPath_backend.Domain.Entities;

namespace EduPath_backend.Application.Mappings
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile() 
        {
            CreateMap<UserCourseDTO, CourseUser>();
            CreateMap<CourseUser, UserCourseDTO>();

            CreateMap<User, ListOfUsersDTO>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => ((User)src).Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => ((User)src).FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => ((User)src).LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => ((User)src).Email));
        }
    }
}
