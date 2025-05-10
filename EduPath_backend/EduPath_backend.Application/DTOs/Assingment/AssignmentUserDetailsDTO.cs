using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.Assingment
{
    public class AssignmentUserDetailsDTO
    {
        public Guid AssignmentId { get; set; }
        public string AssignmentName { get; set; } = default!;
        public string AssignmentContent { get; set; } = default!;
        public string UserEmail { get; set; }
    }
}
