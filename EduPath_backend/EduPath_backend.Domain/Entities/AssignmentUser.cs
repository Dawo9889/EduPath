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
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid AssignmentId { get; set; }
        public Assignment Assignment { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string Filepath { get; set; }
        public DateTime DateSubmitted { get; set; }
    }
}
