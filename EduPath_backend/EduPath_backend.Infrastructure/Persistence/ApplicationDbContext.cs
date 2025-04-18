using EduPath_backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPath_backend.Infrastructure.Persistance
{
    public class ApplicationDbContext : DbContext
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
                .HasKey(cu => new { cu.Id_Course, cu.Id_User }); // Composite Key

            modelBuilder.Entity<CourseUser>()
                .HasOne(cu => cu.Course)
                .WithMany(c => c.CourseUsers)
                .HasForeignKey(cu => cu.Id_Course);

            modelBuilder.Entity<CourseUser>()
                .HasOne(cu => cu.User)
                .WithMany(u => u.CourseUsers)
                .HasForeignKey(cu => cu.Id_User);

            // Configure Assignment-User Many-to-Many Relationship
            modelBuilder.Entity<AssignmentUser>()
                .HasKey(au => new { au.Id_Course, au.Id_User }); // Composite Key

            modelBuilder.Entity<AssignmentUser>()
                .HasOne(au => au.Course)
                .WithMany() 
                .HasForeignKey(au => au.Id_Course);

            modelBuilder.Entity<AssignmentUser>()
                .HasOne(au => au.User)
                .WithMany(u => u.AssignmentUsers)
                .HasForeignKey(au => au.Id_User);

            // Configure Assignment-Course One-to-Many Relationship
            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.Course)
                .WithMany(c => c.Assignments)
                .HasForeignKey(a => a.Id_Course);
        }
    }
    
}
