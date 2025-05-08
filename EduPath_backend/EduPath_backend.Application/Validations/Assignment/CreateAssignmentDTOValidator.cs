using EduPath_backend.Application.DTOs.Assingment;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Validations.Assignment
{
    public class CreateAssignmentDTOValidator : AbstractValidator<CreateAssignmentDTO>
    {
        public CreateAssignmentDTOValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required.");
            RuleFor(x => x.Content).NotEmpty().WithMessage("Content is required."); ;
            RuleFor(x => x.Date_start).NotEmpty().WithMessage("Date_start is required."); ;
            RuleFor(x => x.Date_end).NotEmpty().WithMessage("Date_end is required."); ;
            RuleFor(x => x.Visible).NotEmpty().WithMessage("Visible is required."); ;
            RuleFor(x => x.Date_start).LessThan(x => x.Date_end).WithMessage("Start date must be before end date.");
        }
    }
}
