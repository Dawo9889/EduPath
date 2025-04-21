using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.Course
{
    public class ListCourseDTO
    {
        public Guid Id_Course { get; set; }
        public string? Name { get; set; } 
        public string? Description { get; set; } 
        public bool IsPublic { get; set; }
    }
}
