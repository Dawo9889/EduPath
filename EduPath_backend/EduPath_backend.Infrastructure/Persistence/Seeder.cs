using EduPath_backend.Domain.Entities;
using EduPath_backend.Infrastructure.Persistance;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

            await context.Database.MigrateAsync();

            await SeedRolesAsync(roleManager);
            await SeedCoursesAsync(context);
            await SeedAdminUserAsync(userManager);
            await SeedAssignmentAsync(context);
        }

        private static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            string[] roles = { "Admin", "Teacher", "Student" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
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

        private static async Task SeedCoursesAsync(ApplicationDbContext context)
        {
            if (!context.Courses.Any())
            {
                context.Courses.AddRange(
                    new Course
                    {
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                        Name = "Introduction to Programming",
                        Description = "Learn the basics of programming using C#."
                    },
                    new Course
                    {
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111112"),
                        Name = "Advanced Database Systems",
                        Description = "Explore advanced topics in database design and optimization."
                    },
                    new Course
                    {
                        CourseId = Guid.Parse("11111111-1111-1111-1111-111111111113"),
                        Name = "Web Development with ASP.NET",
                        Description = "Build modern web applications using ASP.NET Core."
                    }
                );
                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedAdminUserAsync(UserManager<User> userManager)
        {
            string adminEmail = "admin@edupath.local";
            string adminPassword = "Admin123!";

            var existingUser = await userManager.FindByEmailAsync(adminEmail);
            if (existingUser == null)
            {
                var admin = new User
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    FirstName = "System",
                    LastName = "Administrator",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(admin, adminPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
    }
}
