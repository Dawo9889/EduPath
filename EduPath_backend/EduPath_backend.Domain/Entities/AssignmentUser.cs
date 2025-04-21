using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Entities
{
    public class AssignmentUser
    {
        public Guid CourseId { get; set; }
        public Course Course { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public string Filepath { get; set; }

        public DateTime Date_submitted { get; set; }
    }
}
