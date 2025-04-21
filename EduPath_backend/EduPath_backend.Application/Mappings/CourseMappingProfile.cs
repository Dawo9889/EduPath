using AutoMapper;
using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Application.DTOs.User;
using EduPath_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace EduPath_backend.Application.Mappings
{
    public class CourseMappingProfile : Profile
    {
        public CourseMappingProfile()
        {
            CreateMap<CreateCourseDTO, Course>()
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => HashPassword(src.PasswordPlainText)));

            CreateMap<Course, ListCourseDTO>();

            CreateMap<Course, CourseDetailsDTO>();

            CreateMap<User, ListOfUsersDTO>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => ((User)src).UserId))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => ((User)src).FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => ((User)src).LastName))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));

        }

        private static string HashPassword(string? plainTextPassword)
        {
            if (string.IsNullOrEmpty(plainTextPassword))
                return string.Empty;

            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var bytes = System.Text.Encoding.UTF8.GetBytes(plainTextPassword);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}
