using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Entities
{
    public class Course
    {
        [Key]
        public Guid CourseId{ get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;

        public bool IsPublic { get; set; } = false;
        public string? PasswordHash { get; set; }
        public ICollection<CourseUser>? CourseUsers { get; set; }
        public ICollection<Assignment>? Assignments { get; set; }
    }
}
