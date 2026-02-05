using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedRoleId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1af616c1-e357-40ab-b6ac-85eefbabdebf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "20753ffa-c8a3-484c-8ad0-60d951d4e34f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8af1a341-3b76-4654-979b-57777174620f", null, "User", "USER" },
                    { "cac43a6e-f7bb-4448-ba05-931d27eb5e93", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8af1a341-3b76-4654-979b-57777174620f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cac43a6e-f7bb-4448-ba05-931d27eb5e93");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1af616c1-e357-40ab-b6ac-85eefbabdebf", null, "Admin", "ADMIN" },
                    { "20753ffa-c8a3-484c-8ad0-60d951d4e34f", null, "User", "USER" }
                });
        }
    }
}
