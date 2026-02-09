using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class One2OneUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_AuthUserId",
                table: "UserDetails",
                column: "AuthUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserDetails_AspNetUsers_AuthUserId",
                table: "UserDetails",
                column: "AuthUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserDetails_AspNetUsers_AuthUserId",
                table: "UserDetails");

            migrationBuilder.DropIndex(
                name: "IX_UserDetails_AuthUserId",
                table: "UserDetails");
        }
    }
}
