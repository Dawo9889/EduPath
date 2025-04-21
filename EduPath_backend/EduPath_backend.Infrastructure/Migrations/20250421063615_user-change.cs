using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EduPath_backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class userchange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Id_Course = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsPublic = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id_Course);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id_User = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProfilePicture = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id_User);
                });

            migrationBuilder.CreateTable(
                name: "Assignments",
                columns: table => new
                {
                    Id_Assignment = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id_Course = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date_start = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Date_end = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assignments", x => x.Id_Assignment);
                    table.ForeignKey(
                        name: "FK_Assignments_Courses_Id_Course",
                        column: x => x.Id_Course,
                        principalTable: "Courses",
                        principalColumn: "Id_Course",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssignmentUsers",
                columns: table => new
                {
                    Id_Course = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id_User = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Filepath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date_submitted = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssignmentUsers", x => new { x.Id_Course, x.Id_User });
                    table.ForeignKey(
                        name: "FK_AssignmentUsers_Courses_Id_Course",
                        column: x => x.Id_Course,
                        principalTable: "Courses",
                        principalColumn: "Id_Course",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssignmentUsers_Users_Id_User",
                        column: x => x.Id_User,
                        principalTable: "Users",
                        principalColumn: "Id_User",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseUsers",
                columns: table => new
                {
                    Id_Course = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id_User = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseUsers", x => new { x.Id_Course, x.Id_User });
                    table.ForeignKey(
                        name: "FK_CourseUsers_Courses_Id_Course",
                        column: x => x.Id_Course,
                        principalTable: "Courses",
                        principalColumn: "Id_Course",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseUsers_Users_Id_User",
                        column: x => x.Id_User,
                        principalTable: "Users",
                        principalColumn: "Id_User",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "Id_Course", "Description", "IsPublic", "Name", "PasswordHash" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "Learn the basics of programming using C#.", false, "Introduction to Programming", null },
                    { new Guid("11111111-1111-1111-1111-111111111112"), "Explore advanced topics in database design and optimization.", false, "Advanced Database Systems", null },
                    { new Guid("11111111-1111-1111-1111-111111111113"), "Build modern web applications using ASP.NET Core.", false, "Web Development with ASP.NET", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id_User", "Name", "ProfilePicture", "RefreshToken", "RefreshTokenExpiryTime", "Role" },
                values: new object[,]
                {
                    { new Guid("22222222-2222-2222-2222-222222222221"), "Admin User", null, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0 },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "Teacher User", null, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { new Guid("22222222-2222-2222-2222-222222222223"), "Student User", null, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Assignments_Id_Course",
                table: "Assignments",
                column: "Id_Course");

            migrationBuilder.CreateIndex(
                name: "IX_AssignmentUsers_Id_User",
                table: "AssignmentUsers",
                column: "Id_User");

            migrationBuilder.CreateIndex(
                name: "IX_CourseUsers_Id_User",
                table: "CourseUsers",
                column: "Id_User");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assignments");

            migrationBuilder.DropTable(
                name: "AssignmentUsers");

            migrationBuilder.DropTable(
                name: "CourseUsers");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
