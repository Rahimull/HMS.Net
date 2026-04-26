using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMSApi.Migrations
{
    /// <inheritdoc />
    public partial class AddCurrentStock1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CurrentStocks_Items_ItemId1",
                table: "CurrentStocks");

            migrationBuilder.DropIndex(
                name: "IX_CurrentStocks_ItemId1",
                table: "CurrentStocks");

            migrationBuilder.DropColumn(
                name: "ItemId1",
                table: "CurrentStocks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ItemId1",
                table: "CurrentStocks",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CurrentStocks_ItemId1",
                table: "CurrentStocks",
                column: "ItemId1");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrentStocks_Items_ItemId1",
                table: "CurrentStocks",
                column: "ItemId1",
                principalTable: "Items",
                principalColumn: "Id");
        }
    }
}
