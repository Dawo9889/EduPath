using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EduPath_backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCourseSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "Id_Course", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Learn the basics of programming using C#.", "Introduction to Programming" },
                    { 2, "Explore advanced topics in database design and optimization.", "Advanced Database Systems" },
                    { 3, "Build modern web applications using ASP.NET Core.", "Web Development with ASP.NET" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id_Course",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id_Course",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id_Course",
                keyValue: 3);
        }
    }
}
