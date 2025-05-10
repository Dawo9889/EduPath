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
        }
    }
}
