using EduPath_backend.Domain.Interfaces;
using EduPath_backend.Infrastructure.Persistance;
using EduPath_backend.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EduPath_backend.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("EduPathDb");
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));



            services.AddScoped<ICourseRepository, CourseRepository>();
        }

       
    }
}
