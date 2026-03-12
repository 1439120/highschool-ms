using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class addUsedetailsColumAuth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserDetails_AuthUserId",
                table: "UserDetails");

            migrationBuilder.AddColumn<int>(
                name: "UserDetailsId",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_AuthUserId",
                table: "UserDetails",
                column: "AuthUserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserDetails_AuthUserId",
                table: "UserDetails");

            migrationBuilder.DropColumn(
                name: "UserDetailsId",
                table: "AspNetUsers");

            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_AuthUserId",
                table: "UserDetails",
                column: "AuthUserId");
        }
    }
}
