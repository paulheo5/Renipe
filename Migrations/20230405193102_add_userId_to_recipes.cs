using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Renipe.Migrations
{
    /// <inheritdoc />
    public partial class add_userId_to_recipes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "saved_recipe",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_saved_recipe_user_id",
                table: "saved_recipe",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_saved_recipe_Users_user_id",
                table: "saved_recipe",
                column: "user_id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_saved_recipe_Users_user_id",
                table: "saved_recipe");

            migrationBuilder.DropIndex(
                name: "IX_saved_recipe_user_id",
                table: "saved_recipe");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "saved_recipe");
        }
    }
}
