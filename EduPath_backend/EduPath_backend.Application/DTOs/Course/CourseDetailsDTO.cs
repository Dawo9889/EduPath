using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.Course
{
    public class CourseDetailsDTO
    {
        public Guid CourseId { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;

        public bool IsPublic { get; set; } = false;
    }
}
