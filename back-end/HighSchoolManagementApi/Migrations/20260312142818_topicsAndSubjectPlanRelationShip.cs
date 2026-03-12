using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class topicsAndSubjectPlanRelationShip : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubjectPlanId",
                table: "SubjectTopics",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SubjectTopics_SubjectPlanId",
                table: "SubjectTopics",
                column: "SubjectPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectTopics_SubjectPlan_SubjectPlanId",
                table: "SubjectTopics",
                column: "SubjectPlanId",
                principalTable: "SubjectPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubjectTopics_SubjectPlan_SubjectPlanId",
                table: "SubjectTopics");

            migrationBuilder.DropIndex(
                name: "IX_SubjectTopics_SubjectPlanId",
                table: "SubjectTopics");

            migrationBuilder.DropColumn(
                name: "SubjectPlanId",
                table: "SubjectTopics");
        }
    }
}
