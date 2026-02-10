using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class lessonPlanRenameColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_AspNetUsers_ResponsibleId",
                table: "LessonPlan");

            migrationBuilder.DropColumn(
                name: "SubjectId",
                table: "LessonPlan");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "LessonPlan");

            migrationBuilder.AlterColumn<string>(
                name: "ResponsibleId",
                table: "LessonPlan",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_AspNetUsers_ResponsibleId",
                table: "LessonPlan",
                column: "ResponsibleId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_AspNetUsers_ResponsibleId",
                table: "LessonPlan");

            migrationBuilder.AlterColumn<string>(
                name: "ResponsibleId",
                table: "LessonPlan",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "SubjectId",
                table: "LessonPlan",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TeacherId",
                table: "LessonPlan",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_AspNetUsers_ResponsibleId",
                table: "LessonPlan",
                column: "ResponsibleId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
