using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMSApi.Migrations
{
    /// <inheritdoc />
    public partial class FixedStoreAndPharmacy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Items_Name_CategoryId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Salesdetails");

            migrationBuilder.DropColumn(
                name: "ReferenceId",
                table: "ItemStocks");

            migrationBuilder.DropColumn(
                name: "ReferenceType",
                table: "ItemStocks");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "ItemStocks",
                newName: "RemainingQuantity");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "ItemStocks",
                newName: "InitialQuantity");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "ItemStocks",
                newName: "BuyPrice");

            migrationBuilder.AlterColumn<decimal>(
                name: "UnitPrice",
                table: "Salesdetails",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<decimal>(
                name: "Discount",
                table: "Salesdetails",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AddColumn<decimal>(
                name: "BuyPrice",
                table: "Salesdetails",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "ItemStockId",
                table: "Salesdetails",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalAmount",
                table: "Sales",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalProfit",
                table: "Sales",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "ExpiryDate",
                table: "PurchaseDetails",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "BatchNumber",
                table: "PurchaseDetails",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BatchNumber",
                table: "ItemStocks",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Barcode",
                table: "Items",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BrandName",
                table: "Items",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Items",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GenericName",
                table: "Items",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Items",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "BatchSequence",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Year = table.Column<int>(type: "INTEGER", nullable: false),
                    LastNumber = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatchSequence", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StockMovement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ItemStockId = table.Column<int>(type: "INTEGER", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    ReferenceId = table.Column<int>(type: "INTEGER", nullable: true),
                    ReferenceType = table.Column<int>(type: "INTEGER", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockMovement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StockMovement_ItemStocks_ItemStockId",
                        column: x => x.ItemStockId,
                        principalTable: "ItemStocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Salesdetails_ItemStockId",
                table: "Salesdetails",
                column: "ItemStockId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemStocks_BatchNumber",
                table: "ItemStocks",
                column: "BatchNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Items_Barcode",
                table: "Items",
                column: "Barcode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_Code",
                table: "Items",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_Name_CategoryId_UnitId",
                table: "Items",
                columns: new[] { "Name", "CategoryId", "UnitId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StockMovement_ItemStockId",
                table: "StockMovement",
                column: "ItemStockId");

            migrationBuilder.AddForeignKey(
                name: "FK_Salesdetails_ItemStocks_ItemStockId",
                table: "Salesdetails",
                column: "ItemStockId",
                principalTable: "ItemStocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Salesdetails_ItemStocks_ItemStockId",
                table: "Salesdetails");

            migrationBuilder.DropTable(
                name: "BatchSequence");

            migrationBuilder.DropTable(
                name: "StockMovement");

            migrationBuilder.DropIndex(
                name: "IX_Salesdetails_ItemStockId",
                table: "Salesdetails");

            migrationBuilder.DropIndex(
                name: "IX_ItemStocks_BatchNumber",
                table: "ItemStocks");

            migrationBuilder.DropIndex(
                name: "IX_Items_Barcode",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_Code",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_Name_CategoryId_UnitId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "BuyPrice",
                table: "Salesdetails");

            migrationBuilder.DropColumn(
                name: "ItemStockId",
                table: "Salesdetails");

            migrationBuilder.DropColumn(
                name: "TotalProfit",
                table: "Sales");

            migrationBuilder.DropColumn(
                name: "Barcode",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "BrandName",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "GenericName",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "RemainingQuantity",
                table: "ItemStocks",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "InitialQuantity",
                table: "ItemStocks",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "BuyPrice",
                table: "ItemStocks",
                newName: "Date");

            migrationBuilder.AlterColumn<decimal>(
                name: "UnitPrice",
                table: "Salesdetails",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Discount",
                table: "Salesdetails",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "Salesdetails",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalAmount",
                table: "Sales",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "ExpiryDate",
                table: "PurchaseDetails",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BatchNumber",
                table: "PurchaseDetails",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "BatchNumber",
                table: "ItemStocks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "ReferenceId",
                table: "ItemStocks",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReferenceType",
                table: "ItemStocks",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Items",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_Items_Name_CategoryId",
                table: "Items",
                columns: new[] { "Name", "CategoryId" },
                unique: true);
        }
    }
}
