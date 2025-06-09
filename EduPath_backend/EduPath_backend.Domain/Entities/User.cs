
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EduPath_backend.Domain.Entities
{
    public class User : IdentityUser
    {
        [Key]
        //public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public byte[]? ProfilePicture { get; set; }

        public bool MustChangePassword { get; set; } = true;

        //Relations
        public ICollection<CourseUser> CourseUsers { get; set; }
        public ICollection<AssignmentUser> AssignmentUsers { get; set; }
    }

}
