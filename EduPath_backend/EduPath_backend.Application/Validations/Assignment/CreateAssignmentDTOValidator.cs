﻿using EduPath_backend.Application.DTOs.Assingment;
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
            RuleFor(x => x.DateStart).NotEmpty().WithMessage("DateStart is required."); ;
            RuleFor(x => x.DateEnd).NotEmpty().WithMessage("DateEnd is required."); ;
            RuleFor(x => x.Visible).NotEmpty().WithMessage("Visible is required."); ;
            RuleFor(x => x.DateStart).LessThan(x => x.DateEnd).WithMessage("Start date must be before end date.");
        }
    }
}
