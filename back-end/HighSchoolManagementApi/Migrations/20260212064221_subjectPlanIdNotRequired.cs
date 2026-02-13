using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class subjectPlanIdNotRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_SubjectPlan_SubjectPlanId",
                table: "LessonPlan");

            migrationBuilder.AlterColumn<int>(
                name: "SubjectPlanId",
                table: "LessonPlan",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_SubjectPlan_SubjectPlanId",
                table: "LessonPlan",
                column: "SubjectPlanId",
                principalTable: "SubjectPlan",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_SubjectPlan_SubjectPlanId",
                table: "LessonPlan");

            migrationBuilder.AlterColumn<int>(
                name: "SubjectPlanId",
                table: "LessonPlan",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_SubjectPlan_SubjectPlanId",
                table: "LessonPlan",
                column: "SubjectPlanId",
                principalTable: "SubjectPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
