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
    }
}
