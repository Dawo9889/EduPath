using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduPath_backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id_Course",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "IsPublic", "PasswordHash" },
                values: new object[] { false, null });

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id_Course",
                keyValue: new Guid("11111111-1111-1111-1111-111111111112"),
                columns: new[] { "IsPublic", "PasswordHash" },
                values: new object[] { false, null });

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id_Course",
                keyValue: new Guid("11111111-1111-1111-1111-111111111113"),
                columns: new[] { "IsPublic", "PasswordHash" },
                values: new object[] { false, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Courses");
        }
    }
}
