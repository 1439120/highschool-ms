using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class fixingClassroomColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "roomNumber",
                table: "Classrooms",
                newName: "RoomNumber");

            migrationBuilder.RenameColumn(
                name: "academicYear",
                table: "Classrooms",
                newName: "AcademicYear");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RoomNumber",
                table: "Classrooms",
                newName: "roomNumber");

            migrationBuilder.RenameColumn(
                name: "AcademicYear",
                table: "Classrooms",
                newName: "academicYear");
        }
    }
}
