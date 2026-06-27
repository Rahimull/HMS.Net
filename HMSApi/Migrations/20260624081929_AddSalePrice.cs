using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMSApi.Migrations
{
    /// <inheritdoc />
    public partial class AddSalePrice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "SalePrice",
                table: "PurchaseDetails",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SalePrice",
                table: "ItemStocks",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SalePrice",
                table: "PurchaseDetails");

            migrationBuilder.DropColumn(
                name: "SalePrice",
                table: "ItemStocks");
        }
    }
}
