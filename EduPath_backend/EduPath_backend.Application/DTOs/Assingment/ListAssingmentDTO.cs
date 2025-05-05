using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.Assingment
{
    public class ListAssingmentDTO
    {
        public Guid CourseId { get; set; }
        public string Name { get; set; } = default!;
        public string Content { get; set; } = default!;
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public bool Visible { get; set; } = true;
    }
}
