using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EduPath_backend.Domain.Entities
{
    public class User
    {
        [Key]
        public Guid Id_User { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserRole Role { get; set; } // Updated to use enum

        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public byte[]? ProfilePicture { get; set; }

        public ICollection<CourseUser> CourseUsers { get; set; }
        public ICollection<AssignmentUser> AssignmentUsers { get; set; }
    }

    public enum UserRole
    {
        Admin,
        Teacher,
        Student
    }
}
