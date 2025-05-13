using EduPath_backend.Application.DTOs.Assingment;
using EduPath_backend.Application.Mappings;
using EduPath_backend.Application.Services.Assignment;
using EduPath_backend.Application.Services.Course;
using EduPath_backend.Application.Services.User;
using EduPath_backend.Application.Validations.Assignment;
using EduPath_backend.Application.Validations.Course;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace EduPath_backend.Application.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddApplication(this IServiceCollection services)
        {
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAssignmentService, AssignmentService>();

            // Mapping
            services.AddAutoMapper(typeof(CourseMappingProfile));
            services.AddAutoMapper(typeof(UserMappingProfile));
            services.AddAutoMapper(typeof(AssignmentMappingProfile));

            // Validators
            services.AddValidatorsFromAssemblyContaining<CreateCourseDTOValidator>();
            services.AddValidatorsFromAssemblyContaining<CreateAssignmentDTOValidator>();
        }
    }
}
