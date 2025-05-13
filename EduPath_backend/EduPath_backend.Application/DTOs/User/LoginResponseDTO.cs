using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.User
{
    public class LoginResponseDTO
    {
        public string TokenType { get; set; } = "Bearer";
        public string AccessToken { get; set; } 
        public string RefreshToken { get; set; }
        public int ExpiresIn { get; set; }
    }
}
