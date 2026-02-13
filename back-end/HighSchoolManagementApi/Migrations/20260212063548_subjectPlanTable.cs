using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class subjectPlanTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubjectPlanId",
                table: "LessonPlan",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SubjectPlan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    SubjectId = table.Column<int>(type: "integer", nullable: false),
                    CreateUserId = table.Column<int>(type: "integer", nullable: false),
                    CreateUserId1 = table.Column<string>(type: "text", nullable: true),
                    GradeId = table.Column<int>(type: "integer", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectPlan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubjectPlan_AspNetUsers_CreateUserId1",
                        column: x => x.CreateUserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SubjectPlan_Grades_GradeId",
                        column: x => x.GradeId,
                        principalTable: "Grades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubjectPlan_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonPlan_SubjectPlanId",
                table: "LessonPlan",
                column: "SubjectPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectPlan_CreateUserId1",
                table: "SubjectPlan",
                column: "CreateUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectPlan_GradeId",
                table: "SubjectPlan",
                column: "GradeId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectPlan_SubjectId",
                table: "SubjectPlan",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_SubjectPlan_SubjectPlanId",
                table: "LessonPlan",
                column: "SubjectPlanId",
                principalTable: "SubjectPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_SubjectPlan_SubjectPlanId",
                table: "LessonPlan");

            migrationBuilder.DropTable(
                name: "SubjectPlan");

            migrationBuilder.DropIndex(
                name: "IX_LessonPlan_SubjectPlanId",
                table: "LessonPlan");

            migrationBuilder.DropColumn(
                name: "SubjectPlanId",
                table: "LessonPlan");
        }
    }
}
