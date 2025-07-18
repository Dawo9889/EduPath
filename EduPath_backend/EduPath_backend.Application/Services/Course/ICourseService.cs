﻿using EduPath_backend.Application.DTOs.Course;
using EduPath_backend.Application.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Application.Services.Course
{
    public interface ICourseService
    {
        Task<bool> AddCourseAsync(CreateCourseDTO courseDTO);
        Task<List<ListCourseDTO>> GetAvailableCoursesAsync();
        Task<CourseDetailsDTO> GetCourseByIdAsync(Guid id);
        Task JoinCourseAsync(Guid courseId, string? password, string userId);

        Task<List<ListOfUsersDTO>> GetUsersByCourseId(Guid courseId);

        Task<bool> UpdateCourseAsync(Guid courseId, CreateCourseDTO updatedCourse, string userId);
        Task <List<ListCourseDTO>> GetCoursesByUserIdAsync(string userId);

        Task<bool> DeleteCourseAsync(Guid courseId, string userId);
        Task<List<ListCourseDTO>> GetCoursesByOwnerIdAsync(string ownerId);
    }
}
