using EduPath_backend.Application.DTOs.Course;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Validations.Course
{
    public class CreateCourseDTOValidator : AbstractValidator<CreateCourseDTO>
    {
        public CreateCourseDTOValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Course name is required.")
                .MaximumLength(100).WithMessage("Course name must not exceed 100 characters.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Course description is required.")
                .MaximumLength(200).WithMessage("Course description must not exceed 200 characters.");

            // Hasło - ogólna reguła długości tylko jeśli istnieje
            RuleFor(x => x.PasswordPlainText)
                .MaximumLength(50).When(x => !string.IsNullOrEmpty(x.PasswordPlainText))
                .WithMessage("Password must not exceed 50 characters.");

            // Jeżeli kurs jest prywatny, wymagaj hasła
            When(x => !x.IsPublic, () =>
            {
                RuleFor(x => x.PasswordPlainText)
                    .NotEmpty().WithMessage("Password is required for private courses.");
            });

            // Jeżeli kurs jest publiczny, hasło nie może być ustawione
            When(x => x.IsPublic, () =>
            {
                RuleFor(x => x.PasswordPlainText)
                    .Must(string.IsNullOrEmpty)
                    .WithMessage("Public courses should not have a password.");
            });
        }
    }

}
