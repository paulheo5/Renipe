using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Renipe.Migrations
{
    /// <inheritdoc />
    public partial class add_userId_to_meals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "NutritionData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_NutritionData_user_id",
                table: "NutritionData",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_NutritionData_Users_user_id",
                table: "NutritionData",
                column: "user_id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NutritionData_Users_user_id",
                table: "NutritionData");

            migrationBuilder.DropIndex(
                name: "IX_NutritionData_user_id",
                table: "NutritionData");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "NutritionData");
        }
    }
}
