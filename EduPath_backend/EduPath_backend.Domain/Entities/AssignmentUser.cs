using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Entities
{
    public class AssignmentUser
    {
        public int Id_Course { get; set; }
        public Course Course { get; set; }

        public int Id_User { get; set; }
        public User User { get; set; }

        public string Filepath { get; set; }
    }
}
