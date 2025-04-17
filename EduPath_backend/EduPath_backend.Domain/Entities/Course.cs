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
        public int Id_Course{ get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<CourseUser> CourseUsers { get; set; }
        public ICollection<Assignment> Assignments { get; set; }
    }
}
