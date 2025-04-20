using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Domain.Entities
{
    public class User
    {
        [Key]
        public Guid Id_User { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public byte[]? ProfilePicture { get; set; }

        public ICollection<CourseUser> CourseUsers { get; set; }
        public ICollection<AssignmentUser> AssignmentUsers { get; set; }
    }
}
