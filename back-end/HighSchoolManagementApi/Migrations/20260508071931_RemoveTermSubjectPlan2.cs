using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTermSubjectPlan2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Term",
                table: "SubjectPlan");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Term",
                table: "SubjectPlan",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
