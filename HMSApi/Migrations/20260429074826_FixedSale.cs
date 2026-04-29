using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMSApi.Migrations
{
    /// <inheritdoc />
    public partial class FixedSale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OPDPrescriptionDetails_Medicines_MedicinesId",
                table: "OPDPrescriptionDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_PrescriptionDetails_Medicines_MedicineId",
                table: "PrescriptionDetails");

            migrationBuilder.DropTable(
                name: "MedicineStocks");

            migrationBuilder.DropTable(
                name: "PharmacySalesdetails");

            migrationBuilder.DropTable(
                name: "Medicines");

            migrationBuilder.DropTable(
                name: "PharmacySales");

            migrationBuilder.DropIndex(
                name: "IX_PrescriptionDetails_MedicineId",
                table: "PrescriptionDetails");

            migrationBuilder.RenameColumn(
                name: "MedicinesId",
                table: "OPDPrescriptionDetails",
                newName: "ItemId");

            migrationBuilder.RenameIndex(
                name: "IX_OPDPrescriptionDetails_MedicinesId",
                table: "OPDPrescriptionDetails",
                newName: "IX_OPDPrescriptionDetails_ItemId");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "PrescriptionDetails",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "Items",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Sales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SaleDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "TEXT", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    IsPaid = table.Column<bool>(type: "INTEGER", nullable: false),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: true),
                    DoctorId = table.Column<int>(type: "INTEGER", nullable: true),
                    PrescriptionId = table.Column<int>(type: "INTEGER", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sales_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Salesdetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    Discount = table.Column<decimal>(type: "TEXT", nullable: false),
                    SaleId = table.Column<int>(type: "INTEGER", nullable: false),
                    ItemId = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salesdetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Salesdetails_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Salesdetails_Sales_SaleId",
                        column: x => x.SaleId,
                        principalTable: "Sales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionDetails_ItemId",
                table: "PrescriptionDetails",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_PatientId",
                table: "Items",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_DoctorId",
                table: "Sales",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Salesdetails_ItemId",
                table: "Salesdetails",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Salesdetails_SaleId",
                table: "Salesdetails",
                column: "SaleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Patients_PatientId",
                table: "Items",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OPDPrescriptionDetails_Items_ItemId",
                table: "OPDPrescriptionDetails",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PrescriptionDetails_Items_ItemId",
                table: "PrescriptionDetails",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Patients_PatientId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_OPDPrescriptionDetails_Items_ItemId",
                table: "OPDPrescriptionDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_PrescriptionDetails_Items_ItemId",
                table: "PrescriptionDetails");

            migrationBuilder.DropTable(
                name: "Salesdetails");

            migrationBuilder.DropTable(
                name: "Sales");

            migrationBuilder.DropIndex(
                name: "IX_PrescriptionDetails_ItemId",
                table: "PrescriptionDetails");

            migrationBuilder.DropIndex(
                name: "IX_Items_PatientId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "PrescriptionDetails");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "ItemId",
                table: "OPDPrescriptionDetails",
                newName: "MedicinesId");

            migrationBuilder.RenameIndex(
                name: "IX_OPDPrescriptionDetails_ItemId",
                table: "OPDPrescriptionDetails",
                newName: "IX_OPDPrescriptionDetails_MedicinesId");

            migrationBuilder.CreateTable(
                name: "Medicines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    GenericName = table.Column<string>(type: "TEXT", nullable: true),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    StockQuantity = table.Column<int>(type: "INTEGER", nullable: false),
                    Unit = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PharmacySales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DoctorId = table.Column<int>(type: "INTEGER", nullable: false),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false),
                    PrescriptionId = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    SaleDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PharmacySales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PharmacySales_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PharmacySales_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PharmacySales_Prescriptions_PrescriptionId",
                        column: x => x.PrescriptionId,
                        principalTable: "Prescriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MedicineStocks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MedicineId = table.Column<int>(type: "INTEGER", nullable: false),
                    BatchNumber = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ExpiryDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    location = table.Column<string>(type: "TEXT", nullable: true),
                    updatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicineStocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MedicineStocks_Medicines_MedicineId",
                        column: x => x.MedicineId,
                        principalTable: "Medicines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PharmacySalesdetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MedicineId = table.Column<int>(type: "INTEGER", nullable: false),
                    PharmacySaleId = table.Column<int>(type: "INTEGER", nullable: false),
                    BatchNumber = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PharmacySalesdetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PharmacySalesdetails_Medicines_MedicineId",
                        column: x => x.MedicineId,
                        principalTable: "Medicines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PharmacySalesdetails_PharmacySales_PharmacySaleId",
                        column: x => x.PharmacySaleId,
                        principalTable: "PharmacySales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionDetails_MedicineId",
                table: "PrescriptionDetails",
                column: "MedicineId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicineStocks_MedicineId",
                table: "MedicineStocks",
                column: "MedicineId");

            migrationBuilder.CreateIndex(
                name: "IX_PharmacySales_DoctorId",
                table: "PharmacySales",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_PharmacySales_PatientId",
                table: "PharmacySales",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_PharmacySales_PrescriptionId",
                table: "PharmacySales",
                column: "PrescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_PharmacySalesdetails_MedicineId",
                table: "PharmacySalesdetails",
                column: "MedicineId");

            migrationBuilder.CreateIndex(
                name: "IX_PharmacySalesdetails_PharmacySaleId",
                table: "PharmacySalesdetails",
                column: "PharmacySaleId");

            migrationBuilder.AddForeignKey(
                name: "FK_OPDPrescriptionDetails_Medicines_MedicinesId",
                table: "OPDPrescriptionDetails",
                column: "MedicinesId",
                principalTable: "Medicines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PrescriptionDetails_Medicines_MedicineId",
                table: "PrescriptionDetails",
                column: "MedicineId",
                principalTable: "Medicines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
