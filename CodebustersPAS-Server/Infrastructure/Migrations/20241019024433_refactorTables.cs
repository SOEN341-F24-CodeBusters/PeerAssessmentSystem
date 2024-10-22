using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class refactorTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Students_studentId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Teachers_TeacherId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "GroupStudent");

            migrationBuilder.DropIndex(
                name: "IX_Users_studentId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_TeacherId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "studentId",
                table: "Users");

            migrationBuilder.AddColumn<Guid>(
                name: "UserID",
                table: "Teachers",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserID",
                table: "Students",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teachers_UserID",
                table: "Teachers",
                column: "UserID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_UserID",
                table: "Students",
                column: "UserID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_UserID",
                table: "Students",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Users_UserID",
                table: "Teachers",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_UserID",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Users_UserID",
                table: "Teachers");

            migrationBuilder.DropIndex(
                name: "IX_Teachers_UserID",
                table: "Teachers");

            migrationBuilder.DropIndex(
                name: "IX_Students_UserID",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Teachers");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Students");

            migrationBuilder.AddColumn<Guid>(
                name: "TeacherId",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "studentId",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GroupStudent",
                columns: table => new
                {
                    GroupsId = table.Column<Guid>(type: "TEXT", nullable: false),
                    StudentsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupStudent", x => new { x.GroupsId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_GroupStudent_Groups_GroupsId",
                        column: x => x.GroupsId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupStudent_Students_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_studentId",
                table: "Users",
                column: "studentId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_TeacherId",
                table: "Users",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupStudent_StudentsId",
                table: "GroupStudent",
                column: "StudentsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Students_studentId",
                table: "Users",
                column: "studentId",
                principalTable: "Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Teachers_TeacherId",
                table: "Users",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id");
        }
    }
}
