using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStudentEvaluations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Score",
                table: "StudentEvaluation",
                newName: "workEthic");

            migrationBuilder.AddColumn<short>(
                name: "conceptualContributions",
                table: "StudentEvaluation",
                type: "INTEGER",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<short>(
                name: "cooperation",
                table: "StudentEvaluation",
                type: "INTEGER",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<short>(
                name: "practicalContributions",
                table: "StudentEvaluation",
                type: "INTEGER",
                nullable: false,
                defaultValue: (short)0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "conceptualContributions",
                table: "StudentEvaluation");

            migrationBuilder.DropColumn(
                name: "cooperation",
                table: "StudentEvaluation");

            migrationBuilder.DropColumn(
                name: "practicalContributions",
                table: "StudentEvaluation");

            migrationBuilder.RenameColumn(
                name: "workEthic",
                table: "StudentEvaluation",
                newName: "Score");
        }
    }
}
