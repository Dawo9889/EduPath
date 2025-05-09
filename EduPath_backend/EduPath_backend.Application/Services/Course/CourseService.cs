using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Domain.Interfaces;
using AutoMapper;
using EduPath_backend.Application.DTOs.User;


namespace EduPath_backend.Application.Services.Course
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;
        private readonly string _coursesBasePath;

        public CourseService(ICourseRepository courseRepository, IMapper mapper)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;

            _coursesBasePath = Environment.GetEnvironmentVariable("COURSES_BASE_PATH") 
                ?? Path.Combine(Directory.GetCurrentDirectory(), "courses_files");
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



        public async Task<bool> AddCourseAsync(CreateCourseDTO courseDTO)
        {
            courseDTO.PasswordPlainText = HashPassword(courseDTO.PasswordPlainText);
            var courseEntity = _mapper.Map<Domain.Entities.Course>(courseDTO);
            var result = await _courseRepository.AddCourseAsync(courseEntity);
            
            if (result)
            {
                var courseFolderPath = Path.Combine(_coursesBasePath, courseEntity.CourseId.ToString());

                if (!Directory.Exists(courseFolderPath))
                {
                    Directory.CreateDirectory(courseFolderPath);
                }
                else
                {
                    throw new Exception("Course folder already exists.");
                }

                return result;
            }
            else
            {
                throw new Exception("Failed to create course.");
            }
        }

        public async Task<List<ListCourseDTO>> GetAvailableCoursesAsync()
        {
           var courses = await _courseRepository.GetAvailableCoursesAsync();

            var listCourseDTOs = _mapper.Map<List<ListCourseDTO>>(courses);
            return listCourseDTOs;
        }

        public async Task<CourseDetailsDTO> GetCourseByIdAsync(Guid id)
        {
            var course = await _courseRepository.GetCourseByIdAsync(id);
            var courseDTO = _mapper.Map<CourseDetailsDTO>(course);
            return courseDTO;
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



        public async Task<List<ListOfUsersDTO>> GetUsersByCourseId(Guid courseId)
        {
            var users = await _courseRepository.GetListOfAssignedUsers(courseId);

            var usersDTO = _mapper.Map<List<ListOfUsersDTO>>(users);

            return usersDTO;
        }


        

        public async Task<bool> UpdateCourseAsync(Guid courseId, CreateCourseDTO updatedCourse)
        {
            var existingCourse = await _courseRepository.GetCourseByIdAsync(courseId);
            if (existingCourse == null)
            {
                throw new Exception("Course not found");
            }
            existingCourse.Name = updatedCourse.Name;
            existingCourse.Description = updatedCourse.Description;
            existingCourse.IsPublic = updatedCourse.IsPublic;

            existingCourse.PasswordHash = HashPassword(updatedCourse.PasswordPlainText);
            var result = await _courseRepository.UpdateCourseAsync(courseId, existingCourse);

            return result;
        }

        public async Task<ListCourseDTO> GetCoursesByUserIdAsync(Guid userId)
        {
            var courses = await _courseRepository.GetCoursesByUserIdAsync(userId);
            if (courses == null)
            {
                throw new Exception("Courses not found");
            }
            var coursesDTO = _mapper.Map<ListCourseDTO>(courses);
            return coursesDTO;
        }

        public async Task<bool> DeleteCourseAsync(Guid courseId)
        {
            var course = await _courseRepository.GetCourseByIdAsync(courseId);
            if (course == null)
            {
                throw new Exception("Course not found");
            }
            // Define the course folder path
            var courseFolderPath = Path.Combine(_coursesBasePath, courseId.ToString());
            // Delete folder contents if exists
            if (Directory.Exists(courseFolderPath))
            {
                try
                {
                    // Delete all files and subdirectories
                    Directory.Delete(courseFolderPath, recursive: true);
                }
                catch (Exception ex)
                {
                    throw new Exception($"Failed to delete course folder: {ex.Message}");
                }
            }

            return await _courseRepository.DeleteCourseAsync(courseId);
        }
    }
}
