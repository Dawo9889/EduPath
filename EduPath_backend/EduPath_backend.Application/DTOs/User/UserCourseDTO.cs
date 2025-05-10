using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.User
{
    public class UserCourseDTO
    {
        public string userID { get; set; } = default!;
        public Guid courseID { get; set; } = default!;
    }
}
