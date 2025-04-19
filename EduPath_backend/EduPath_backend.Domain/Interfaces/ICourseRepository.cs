using EduPath_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Interfaces
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetAvailableCoursesAsync();
    }
}
