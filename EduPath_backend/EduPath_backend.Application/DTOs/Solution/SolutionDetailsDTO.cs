using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.Solution
{
    public class SolutionDetailsDTO
    {
        public Guid Id { get; set; }
        public Guid AssignmentId { get; set; }
        public string UserId { get; set; }
        public string Filepath { get; set; }
        public DateTime DateSubmitted { get; set; }
    }
}
