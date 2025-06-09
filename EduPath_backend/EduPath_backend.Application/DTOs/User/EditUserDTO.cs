using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.DTOs.User
{
    public class EditUserDTO
    {
        public string Id { get; set; } = default!;
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
