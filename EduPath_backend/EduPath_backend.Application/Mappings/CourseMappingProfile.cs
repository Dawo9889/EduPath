using AutoMapper;
using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Application.DTOs.User;
using EduPath_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Mappings
{
    public class CourseMappingProfile : Profile
    {
        public CourseMappingProfile()
        {
            CreateMap<CreateCourseDTO, Course>()
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => HashPassword(src.PasswordPlainText)));

            CreateMap<Course, ListCourseDTO>();

            CreateMap<object, ListOfUsersDTO>()
                .ForMember(dest => dest.Id_User, opt => opt.MapFrom(src => ((User)src).Id_User))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => ((User)src).FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => ((User)src).LastName));
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
