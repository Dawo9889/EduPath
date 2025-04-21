using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduPath_backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class userchange2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id_User",
                keyValue: new Guid("22222222-2222-2222-2222-222222222221"),
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Dawid", "Dawidowski" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id_User",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Szymon", "Szymonowski" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id_User",
                keyValue: new Guid("22222222-2222-2222-2222-222222222223"),
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Andrzej", "Waszut" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Users",
                newName: "Name");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id_User",
                keyValue: new Guid("22222222-2222-2222-2222-222222222221"),
                column: "Name",
                value: "Admin User");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id_User",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                column: "Name",
                value: "Teacher User");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id_User",
                keyValue: new Guid("22222222-2222-2222-2222-222222222223"),
                column: "Name",
                value: "Student User");
        }
    }
}
