using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Entities
{
    public class Assignment
    {
        [Key]
        public int Id_Assignment { get; set; }
        public int Id_Course { get; set; }
        public Course Course { get; set; }

        public string Content { get; set; }
        public DateTime Date_start { get; set; }
        public DateTime Date_end { get; set; }
        public bool Visible { get; set; }
    }
}
