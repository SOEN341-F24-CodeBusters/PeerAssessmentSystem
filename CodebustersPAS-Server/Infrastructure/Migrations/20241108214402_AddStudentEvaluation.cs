using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddStudentEvaluation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {           
            migrationBuilder.CreateTable(
                name: "StudentEvaluation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TeamId = table.Column<Guid>(type: "TEXT", nullable: false),
                    EvaluatorId = table.Column<Guid>(type: "TEXT", nullable: false),
                    EvaluatedId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Score = table.Column<int>(type: "INTEGER", nullable: false),
                    Comments = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentEvaluation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentEvaluation_Students_EvaluatedId",
                        column: x => x.EvaluatedId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentEvaluation_Students_EvaluatorId",
                        column: x => x.EvaluatorId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentEvaluation_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentEvaluation_EvaluatedId",
                table: "StudentEvaluation",
                column: "EvaluatedId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentEvaluation_EvaluatorId",
                table: "StudentEvaluation",
                column: "EvaluatorId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentEvaluation_TeamId",
                table: "StudentEvaluation",
                column: "TeamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentEvaluation");

            migrationBuilder.AddColumn<Guid>(
                name: "TeacherId",
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
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupStudent_StudentsId",
                table: "GroupStudent",
                column: "StudentsId");
        }
    }
}
