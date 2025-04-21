namespace EduPath_backend.Application.DTOs.User;
public class CreateUserDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string TemporaryPassword { get; set; }
    public string Role { get; set; } 
}