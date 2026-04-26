using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMSApi.Migrations
{
    /// <inheritdoc />
    public partial class FixedCurrentStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CurrentStocks",
                table: "CurrentStocks");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "CurrentStocks",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CurrentStocks",
                table: "CurrentStocks",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CurrentStocks_ItemId",
                table: "CurrentStocks",
                column: "ItemId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CurrentStocks",
                table: "CurrentStocks");

            migrationBuilder.DropIndex(
                name: "IX_CurrentStocks_ItemId",
                table: "CurrentStocks");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "CurrentStocks",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CurrentStocks",
                table: "CurrentStocks",
                column: "ItemId");
        }
    }
}
