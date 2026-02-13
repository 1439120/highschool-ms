using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class subjectPlanLastUpdatedOn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubjectPlan_AspNetUsers_CreateById",
                table: "SubjectPlan");

            migrationBuilder.DropIndex(
                name: "IX_SubjectPlan_CreateById",
                table: "SubjectPlan");

            migrationBuilder.DropColumn(
                name: "CreateById",
                table: "SubjectPlan");

            migrationBuilder.RenameColumn(
                name: "UpdatedOn",
                table: "SubjectPlan",
                newName: "LastUpdatedOn");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "SubjectPlan",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectPlan_CreatedById",
                table: "SubjectPlan",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectPlan_AspNetUsers_CreatedById",
                table: "SubjectPlan",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubjectPlan_AspNetUsers_CreatedById",
                table: "SubjectPlan");

            migrationBuilder.DropIndex(
                name: "IX_SubjectPlan_CreatedById",
                table: "SubjectPlan");

            migrationBuilder.RenameColumn(
                name: "LastUpdatedOn",
                table: "SubjectPlan",
                newName: "UpdatedOn");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedById",
                table: "SubjectPlan",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "CreateById",
                table: "SubjectPlan",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubjectPlan_CreateById",
                table: "SubjectPlan",
                column: "CreateById");

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectPlan_AspNetUsers_CreateById",
                table: "SubjectPlan",
                column: "CreateById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
