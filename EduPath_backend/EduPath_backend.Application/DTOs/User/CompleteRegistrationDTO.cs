using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.User
{
    public class CompleteRegistrationDTO
    {
        public string UserId { get; set; }
        public string ResetToken { get; set; }
        public string EmailToken { get; set; }
        public string NewPassword { get; set; }
    }
}
