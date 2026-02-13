using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class subjectPlanTableRenameCreater : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubjectPlan_AspNetUsers_CreateUserId1",
                table: "SubjectPlan");

            migrationBuilder.RenameColumn(
                name: "CreateUserId1",
                table: "SubjectPlan",
                newName: "CreateById");

            migrationBuilder.RenameColumn(
                name: "CreateUserId",
                table: "SubjectPlan",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectPlan_CreateUserId1",
                table: "SubjectPlan",
                newName: "IX_SubjectPlan_CreateById");

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectPlan_AspNetUsers_CreateById",
                table: "SubjectPlan",
                column: "CreateById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubjectPlan_AspNetUsers_CreateById",
                table: "SubjectPlan");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "SubjectPlan",
                newName: "CreateUserId");

            migrationBuilder.RenameColumn(
                name: "CreateById",
                table: "SubjectPlan",
                newName: "CreateUserId1");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectPlan_CreateById",
                table: "SubjectPlan",
                newName: "IX_SubjectPlan_CreateUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectPlan_AspNetUsers_CreateUserId1",
                table: "SubjectPlan",
                column: "CreateUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
