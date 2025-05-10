using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.Course
{
    public class CreateCourseDTO
    {
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;

        public bool IsPublic { get; set; } = false;

        public string? PasswordPlainText { get; set; }
        public string OwnerId { get; set; } = default!;
    }
}
