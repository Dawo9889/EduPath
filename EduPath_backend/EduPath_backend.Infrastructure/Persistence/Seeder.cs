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

            // Seed a Lecturer user (the course owner)
            var LecturerUser = await SeedLecturerUserAsync(userManager);

            // Seed courses with the LecturerUser as owner
            await SeedCoursesAsync(context, LecturerUser.Id);

            // Seed sample assignments 
            await SeedAssignmentAsync(context);

            await SeedAssignmentUsersAsync(context, userManager);

            // Seed multiple users and Lecturers
            await SeedMultipleUsersAsync(userManager, 6);

            await SeedCourseUsersAsync(context, userManager);

        }

        private static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            string[] roles = { "Admin", "Lecturer", "Student" };

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

        private static async Task<User> SeedLecturerUserAsync(UserManager<User> userManager)
        {
            string LecturerEmail = "Lecturer@edupath.local";
            var existing = await userManager.FindByEmailAsync(LecturerEmail);
            if (existing != null)
                return existing;

            var Lecturer = new User
            {
                UserName = LecturerEmail,
                Email = LecturerEmail,
                FirstName = "John",
                LastName = "Lecturer",
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(Lecturer, "Lecturer123!");
            if (result.Succeeded)
                await userManager.AddToRoleAsync(Lecturer, "Lecturer");

            return Lecturer;
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

        private static async Task SeedMultipleUsersAsync(UserManager<User> userManager, int userCount)
        {
            for (int i = 1; i <= userCount; i++)
            {
                string studentEmail = $"student{i}@edupath.local";
                var student = await userManager.FindByEmailAsync(studentEmail);
                if (student == null)
                {
                    student = new User
                    {
                        UserName = studentEmail,
                        Email = studentEmail,
                        FirstName = $"Student{i}",
                        LastName = "Johnson",
                        EmailConfirmed = true
                    };
                    var result = await userManager.CreateAsync(student, "Student123!");
                    if (result.Succeeded)
                        await userManager.AddToRoleAsync(student, "Student");
                }
            }
        }


        private static async Task SeedAssignmentAsync(ApplicationDbContext context)
        {
            if (!context.Assignments.Any())
            {
                context.Assignments.AddRange(
                    new Assignment
                    {
                        AssignmentId = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                        Name = "Zadanie 1",
                        Content = "Opis zadania 1",
                        DateStart = new DateTime(2025, 5, 1),
                        DateEnd = new DateTime(2025, 5, 10),
                        Visible = true
                    },
                    new Assignment
                    {
                        AssignmentId = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                        Name = "Zadanie 2",
                        Content = "Opis zadania 2",
                        DateStart = new DateTime(2025, 5, 2),
                        DateEnd = new DateTime(2025, 5, 15),
                        Visible = false
                    },
                    new Assignment
                    {
                        AssignmentId = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111112"),
                        Name = "Zadanie 1",
                        Content = "Opis zadania 1",
                        DateStart = new DateTime(2025, 5, 1),
                        DateEnd = new DateTime(2025, 5, 10),
                        Visible = true
                    },
                    new Assignment
                    {
                        AssignmentId = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111112"),
                        Name = "Zadanie 2",
                        Content = "Opis zadania 2",
                        DateStart = new DateTime(2025, 5, 2),
                        DateEnd = new DateTime(2025, 5, 15),
                        Visible = false
                    },
                    new Assignment
                    {
                        AssignmentId = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111113"),
                        Name = "Zadanie 1",
                        Content = "Opis zadania 1",
                        DateStart = new DateTime(2025, 5, 1),
                        DateEnd = new DateTime(2025, 5, 10),
                        Visible = true
                    },
                    new Assignment
                    {
                        AssignmentId = Guid.NewGuid(),
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111113"),
                        Name = "Zadanie 2",
                        Content = "Opis zadania 2",
                        DateStart = new DateTime(2025, 5, 2),
                        DateEnd = new DateTime(2025, 5, 15),
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
                    AssignmentId = a.AssignmentId,
                    UserId = student.Id,
                    Filepath = "/LOCAL/PATH",
                    DateSubmitted = DateTime.UtcNow
                });

                context.AssignmentUsers.AddRange(assignmentUsers);
                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedCourseUsersAsync(ApplicationDbContext context, UserManager<User> userManager)
        {
            var students = await userManager.GetUsersInRoleAsync("Student");

            if (!students.Any())
                return;

            var courses = await context.Courses.ToListAsync();

            if (context.CourseUsers.Any())
                return;

            var courseUsers = new List<CourseUser>();

            for (int i = 0; i < courses.Count && i < students.Count; i++)
            {
                courseUsers.Add(new CourseUser
                {
                    CourseId = courses[i].CourseId,
                    UserId = students[i].Id
                });
            }

            if (courseUsers.Any())
            {
                context.CourseUsers.AddRange(courseUsers);
                await context.SaveChangesAsync();
            }
        }

    }
}
