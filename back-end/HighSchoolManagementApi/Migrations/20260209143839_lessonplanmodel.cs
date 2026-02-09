using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class lessonplanmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LessonPlan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    SubjectId = table.Column<int>(type: "integer", nullable: false),
                    SubjectsId = table.Column<int>(type: "integer", nullable: false),
                    TeacherId = table.Column<string>(type: "text", nullable: false),
                    ResponsibleId = table.Column<string>(type: "text", nullable: true),
                    GradeId = table.Column<int>(type: "integer", nullable: false),
                    GradesId = table.Column<int>(type: "integer", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastUpdatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonPlan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LessonPlan_AspNetUsers_ResponsibleId",
                        column: x => x.ResponsibleId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LessonPlan_Grades_GradesId",
                        column: x => x.GradesId,
                        principalTable: "Grades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonPlan_Subjects_SubjectsId",
                        column: x => x.SubjectsId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonPlan_GradesId",
                table: "LessonPlan",
                column: "GradesId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonPlan_ResponsibleId",
                table: "LessonPlan",
                column: "ResponsibleId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonPlan_SubjectsId",
                table: "LessonPlan",
                column: "SubjectsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonPlan");
        }
    }
}
