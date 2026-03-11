using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class addingFieldsDocuments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Documents",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "Documents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Documents",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_AspNetUsers_CreatedById1",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_CreatedById1",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Documents");
        }
    }
}
