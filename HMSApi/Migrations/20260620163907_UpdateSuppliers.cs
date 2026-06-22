using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMSApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSuppliers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_ContactInfo",
                table: "Suppliers",
                column: "ContactInfo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_Name",
                table: "Suppliers",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Suppliers_ContactInfo",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_Name",
                table: "Suppliers");
        }
    }
}
