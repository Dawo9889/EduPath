using EduPath_backend.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EduPath_backend.Infrastructure.Persistance
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<AssignmentUser> AssignmentUsers { get; set; }
        public DbSet<CourseUser> CourseUsers { get; set; }
        public DbSet<User> Users { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Course-User Many-to-Many Relationship
            modelBuilder.Entity<CourseUser>()
                .HasKey(cu => new { cu.CourseId, cu.UserId }); // Composite Key

            modelBuilder.Entity<CourseUser>()
                .HasOne(cu => cu.Course)
                .WithMany(c => c.CourseUsers)
                .HasForeignKey(cu => cu.CourseId);

            modelBuilder.Entity<CourseUser>()
                .HasOne(cu => cu.User)
                .WithMany(u => u.CourseUsers)
                .HasForeignKey(cu => cu.UserId);

            // Configure Assignment-User Many-to-Many Relationship
            modelBuilder.Entity<AssignmentUser>()
                .HasKey(au => new { au.CourseId, au.UserId }); // Composite Key

            modelBuilder.Entity<AssignmentUser>()
                .HasOne(au => au.Course)
                .WithMany() 
                .HasForeignKey(au => au.CourseId);

            modelBuilder.Entity<AssignmentUser>()
                .HasOne(au => au.User)
                .WithMany(u => u.AssignmentUsers)
                .HasForeignKey(au => au.UserId);

            // Configure Assignment-Course One-to-Many Relationship
            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.Course)
                .WithMany(c => c.Assignments)
                .HasForeignKey(a => a.CourseId);


            // Seed data for Course
            modelBuilder.Entity<Course>().HasData(
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


        }
    }
    
}
