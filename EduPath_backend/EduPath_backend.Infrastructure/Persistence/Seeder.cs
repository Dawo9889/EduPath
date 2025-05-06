using EduPath_backend.Domain.Entities;
using EduPath_backend.Infrastructure.Persistance;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace EduPath_backend.Infrastructure.Persistence
{
    public class Seeder
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            // Apply migrations
            await context.Database.MigrateAsync();

            // Seed roles
            await SeedRolesAsync(roleManager);

            // Seed admin user
            var adminUser = await SeedAdminUserAsync(userManager);

            // Seed a teacher user (the course owner)
            var teacherUser = await SeedTeacherUserAsync(userManager);

            // Seed courses with the teacherUser as owner
            await SeedCoursesAsync(context, teacherUser.Id);
        }

        private static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            string[] roles = { "Admin", "Teacher", "Student" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                    await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        private static async Task<User> SeedAdminUserAsync(UserManager<User> userManager)
        {
            string adminEmail = "admin@edupath.local";
            var existing = await userManager.FindByEmailAsync(adminEmail);
            if (existing != null)
                return existing;

            var admin = new User
            {
                UserName = adminEmail,
                Email = adminEmail,
                FirstName = "System",
                LastName = "Administrator",
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(admin, "Admin123!");
            if (result.Succeeded)
                await userManager.AddToRoleAsync(admin, "Admin");

            return admin;
        }

        private static async Task<User> SeedTeacherUserAsync(UserManager<User> userManager)
        {
            string teacherEmail = "teacher@edupath.local";
            var existing = await userManager.FindByEmailAsync(teacherEmail);
            if (existing != null)
                return existing;

            var teacher = new User
            {
                UserName = teacherEmail,
                Email = teacherEmail,
                FirstName = "John",
                LastName = "Teacher",
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(teacher, "Teacher123!");
            if (result.Succeeded)
                await userManager.AddToRoleAsync(teacher, "Teacher");

            return teacher;
        }

        private static async Task SeedCoursesAsync(ApplicationDbContext context, string ownerId)
        {
            if (context.Courses.Any())
                return;

            var courses = new[]
            {
                new Course
                {
                    CourseId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    Name = "Introduction to Programming",
                    Description = "Learn the basics of programming using C#.",
                    PasswordHash = "VzEUIAl9XhLjgS1XlUWaxUWCcqtRHZ2xTwrhjyXJ6no=",
                    OwnerId = ownerId
                },
                new Course
                {
                    CourseId = Guid.Parse("11111111-1111-1111-1111-111111111112"),
                    Name = "Advanced Database Systems",
                    Description = "Explore advanced topics in database design and optimization.",
                    OwnerId = ownerId
                },
                new Course
                {
                    CourseId = Guid.Parse("11111111-1111-1111-1111-111111111113"),
                    Name = "Web Development with ASP.NET",
                    Description = "Build modern web applications using ASP.NET Core.",
                    OwnerId = ownerId
                }
            };

            context.Courses.AddRange(courses);
            await context.SaveChangesAsync();
        }
    }
}
