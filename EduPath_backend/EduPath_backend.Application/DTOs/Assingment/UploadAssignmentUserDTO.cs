using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace EduPath_backend.Application.DTOs.Assingment
{
    public class UploadAssignmentUserDTO
    {
        public Guid AssignmentId { get; set; }
        public string UserId { get; set; }
        public string CourseId { get; set; }
        public string? Filename { get; set; }
        public IFormFile File { get; set; }
        public DateTime DateSubmitted { get; set; }
    }
}
