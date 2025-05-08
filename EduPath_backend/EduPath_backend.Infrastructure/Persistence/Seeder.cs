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

            // Seed a student user 
            var studentUser = await SeedStudentUserAsync(userManager);

            // Seed a teacher user (the course owner)
            var teacherUser = await SeedTeacherUserAsync(userManager);

            // Seed courses with the teacherUser as owner
            await SeedCoursesAsync(context, teacherUser.Id);

            await SeedAssignmentAsync(context);
            await SeedAssignmentUsersAsync(context, userManager);
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

        private static async Task SeedAssignmentAsync(ApplicationDbContext context)
        {
            if (!context.Assignments.Any())
            {
                context.Assignments.AddRange(
                    new Assignment
                    {
                        Id_Assignment = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                        Name = "Zadanie 1",
                        Content = "Opis zadania 1",
                        Date_start = new DateTime(2025, 5, 1),
                        Date_end = new DateTime(2025, 5, 10),
                        Visible = true
                    },
                    new Assignment
                    {
                        Id_Assignment = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                        Name = "Zadanie 2",
                        Content = "Opis zadania 2",
                        Date_start = new DateTime(2025, 5, 2),
                        Date_end = new DateTime(2025, 5, 15),
                        Visible = false
                    },
                    new Assignment
                    {
                        Id_Assignment = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111112"),
                        Name = "Zadanie 1",
                        Content = "Opis zadania 1",
                        Date_start = new DateTime(2025, 5, 1),
                        Date_end = new DateTime(2025, 5, 10),
                        Visible = true
                    },
                    new Assignment
                    {
                        Id_Assignment = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111112"),
                        Name = "Zadanie 2",
                        Content = "Opis zadania 2",
                        Date_start = new DateTime(2025, 5, 2),
                        Date_end = new DateTime(2025, 5, 15),
                        Visible = false
                    },
                    new Assignment
                    {
                        Id_Assignment = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111113"),
                        Name = "Zadanie 1",
                        Content = "Opis zadania 1",
                        Date_start = new DateTime(2025, 5, 1),
                        Date_end = new DateTime(2025, 5, 10),
                        Visible = true
                    },
                    new Assignment
                    {
                        Id_Assignment = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111113"),
                        Name = "Zadanie 2",
                        Content = "Opis zadania 2",
                        Date_start = new DateTime(2025, 5, 2),
                        Date_end = new DateTime(2025, 5, 15),
                        Visible = false
                    });
                await context.SaveChangesAsync();
            }
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
                    PasswordHash = "VzEUIAl9XhLjgS1XlUWaxUWCcqtRHZ2xTwrhjyXJ6no=",
                    OwnerId = ownerId
                },
                new Course
                {
                    CourseId = Guid.Parse("11111111-1111-1111-1111-111111111113"),
                    Name = "Web Development with ASP.NET",
                    Description = "Build modern web applications using ASP.NET Core.",
                    PasswordHash = "VzEUIAl9XhLjgS1XlUWaxUWCcqtRHZ2xTwrhjyXJ6no=",
                    OwnerId = ownerId
                }
            };
            context.Courses.AddRange(courses);
            await context.SaveChangesAsync();
        }
        private static async Task<User> SeedStudentUserAsync(UserManager<User> userManager)
        {
            string studentEmail = "student@edupath.local";
            string studentPassword = "Admin123!";

            var existingUser = await userManager.FindByEmailAsync(studentEmail);
            if (existingUser != null)
                return existingUser;

            var student = new User
            {
                UserName = studentEmail,
                Email = studentEmail,
                FirstName = "System",
                LastName = "Administrator",
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(student, studentPassword);
            if (result.Succeeded)
                await userManager.AddToRoleAsync(student, "Student");

            return student;
        }

        private static async Task SeedAssignmentUsersAsync(ApplicationDbContext context, UserManager<User> userManager)
        {
            var student = await userManager.FindByNameAsync("student@edupath.local");
            if (student == null)
                return;

            var assignments = await context.Assignments
                .Where(a => a.CourseId == Guid.Parse("11111111-1111-1111-1111-111111111111"))
                .ToListAsync();

            if (!context.AssignmentUsers.Any())
            {
                var assignmentUsers = assignments.Select(a => new AssignmentUser
                {
                    AssignmentId = a.Id_Assignment,
                    UserId = student.Id,
                    Filepath = "/LOCAL/PATH",
                    Date_submitted = DateTime.UtcNow
                });

                context.AssignmentUsers.AddRange(assignmentUsers);
                await context.SaveChangesAsync();
            }
        }
    }
}
