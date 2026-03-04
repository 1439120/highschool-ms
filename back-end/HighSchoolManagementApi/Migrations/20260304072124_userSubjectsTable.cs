using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighSchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class userSubjectsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserAssignedSubjects",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ClassId = table.Column<int>(type: "integer", nullable: false),
                    SubjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAssignedSubjects", x => new { x.UserId, x.ClassId, x.SubjectId });
                    table.ForeignKey(
                        name: "FK_UserAssignedSubjects_Classrooms_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Classrooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAssignedSubjects_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAssignedSubjects_UserDetails_UserId",
                        column: x => x.UserId,
                        principalTable: "UserDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAssignedSubjects_ClassId",
                table: "UserAssignedSubjects",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAssignedSubjects_SubjectId",
                table: "UserAssignedSubjects",
                column: "SubjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAssignedSubjects");
        }
    }
}
