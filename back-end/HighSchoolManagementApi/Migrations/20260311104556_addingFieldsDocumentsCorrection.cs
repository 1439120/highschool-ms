using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class addingFieldsDocumentsCorrection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_AspNetUsers_CreatedById1",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_CreatedById1",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "Documents");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Documents",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_CreatedById",
                table: "Documents",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_AspNetUsers_CreatedById",
                table: "Documents",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_AspNetUsers_CreatedById",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_CreatedById",
                table: "Documents");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedById",
                table: "Documents",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "Documents",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Documents_CreatedById1",
                table: "Documents",
                column: "CreatedById1");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_AspNetUsers_CreatedById1",
                table: "Documents",
                column: "CreatedById1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
