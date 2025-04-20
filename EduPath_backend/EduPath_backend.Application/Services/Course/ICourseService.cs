using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.Course
{
    public interface ICourseService
    {
        Task<bool> AddCourseAsync(Domain.Entities.Course course);
        Task<List<Domain.Entities.Course>> GetAvailableCoursesAsync();
        Task<Domain.Entities.Course> GetCourseByIdAsync(Guid id);
    }
}
