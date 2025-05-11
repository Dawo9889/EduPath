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

            modelBuilder.Entity<Course>()
            .HasOne(c => c.Owner)
            .WithMany() 
            .HasForeignKey(c => c.OwnerId)
            .OnDelete(DeleteBehavior.Restrict); 



            // Configure Course-User Many-to-Many Relationship
            modelBuilder.Entity<CourseUser>()
                .HasKey(cu => new { cu.CourseId, cu.UserId }); // Composite Key

            modelBuilder.Entity<CourseUser>()
                .HasOne(cu => cu.Course)
                .WithMany(c => c.CourseUsers)
                .HasForeignKey(cu => cu.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CourseUser>()
                .HasOne(cu => cu.User)
                .WithMany(u => u.CourseUsers)
                .HasForeignKey(cu => cu.UserId)
                .OnDelete(DeleteBehavior.Cascade); ;

            // Configure Assignment-User Many-to-Many Relationship
            modelBuilder.Entity<AssignmentUser>()
                .HasKey(au => au.Id);

            modelBuilder.Entity<AssignmentUser>()
                .HasOne(au => au.Assignment)
                .WithMany() 
                .HasForeignKey(au => au.AssignmentId);

            modelBuilder.Entity<AssignmentUser>()
                .HasOne(au => au.User)
                .WithMany(u => u.AssignmentUsers)
                .HasForeignKey(au => au.UserId);

            // Configure Assignment-Course One-to-Many Relationship
            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.Course)
                .WithMany(c => c.Assignments)
                .HasForeignKey(a => a.CourseId);
 

        }
    }
    
}
