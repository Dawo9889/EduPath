using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.Course
{
    public interface ICourseService
    {
        Task<List<Domain.Entities.Course>> GetAvailableCoursesAsync();
    }
}
