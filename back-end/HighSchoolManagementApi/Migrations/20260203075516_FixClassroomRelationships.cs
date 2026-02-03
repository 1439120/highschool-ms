using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class FixClassroomRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classroom_Users_ClassTeacherId",
                table: "Classroom");

            migrationBuilder.AddColumn<int>(
                name: "ClassroomId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LearnerClassroomId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ClassroomId",
                table: "Users",
                column: "ClassroomId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_LearnerClassroomId",
                table: "Users",
                column: "LearnerClassroomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Classroom_Users_ClassTeacherId",
                table: "Classroom",
                column: "ClassTeacherId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Classroom_ClassroomId",
                table: "Users",
                column: "ClassroomId",
                principalTable: "Classroom",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Classroom_LearnerClassroomId",
                table: "Users",
                column: "LearnerClassroomId",
                principalTable: "Classroom",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classroom_Users_ClassTeacherId",
                table: "Classroom");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Classroom_ClassroomId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Classroom_LearnerClassroomId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ClassroomId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_LearnerClassroomId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ClassroomId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LearnerClassroomId",
                table: "Users");

            migrationBuilder.AddForeignKey(
                name: "FK_Classroom_Users_ClassTeacherId",
                table: "Classroom",
                column: "ClassTeacherId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
