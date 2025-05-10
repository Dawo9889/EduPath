using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Entities
{
    public class Assignment
    {
        [Key]
        public Guid Id_Assignment { get; set; }

        [ForeignKey("Course")]
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public bool Visible { get; set; }
    }
}
