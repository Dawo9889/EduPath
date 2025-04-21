using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Domain.Interfaces;
using AutoMapper;


namespace EduPath_backend.Application.Services.Course
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;

        public CourseService(ICourseRepository courseRepository, IMapper mapper)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;
        }

        public async Task<bool> AddCourseAsync(CreateCourseDTO courseDTO)
        {
            var courseEntity = _mapper.Map<Domain.Entities.Course>(courseDTO);
            var result = await _courseRepository.AddCourseAsync(courseEntity);
            return result;
        }

        public async Task<List<ListCourseDTO>> GetAvailableCoursesAsync()
        {
           var courses = await _courseRepository.GetAvailableCoursesAsync();

            var listCourseDTOs = _mapper.Map<List<ListCourseDTO>>(courses);
            return listCourseDTOs;
        }

        public async Task<Domain.Entities.Course> GetCourseByIdAsync(Guid id)
        {
            var course = await _courseRepository.GetCourseByIdAsync(id);
            return course;
        }

        public async Task JoinCourseAsync(Guid courseId, Guid userId, string? password)
        {
            var course = await _courseRepository.GetCourseWithUsersAsync(courseId);
            if (course == null)
                throw new Exception("Course not found");

            var alreadyInCourse = await _courseRepository.IsUserInCourseAsync(courseId, userId);
            if (alreadyInCourse)
                throw new Exception("You are already enrolled in this course");

            if (!course.IsPublic)
            {
                if (string.IsNullOrWhiteSpace(password))
                    throw new UnauthorizedAccessException("Password is required for this private course.");

                var hashedInput = HashPassword(password);

                if (course.PasswordHash != hashedInput)
                    throw new UnauthorizedAccessException("Invalid password.");
            }

            await _courseRepository.AddUserToCourseAsync(courseId, userId);
            
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
