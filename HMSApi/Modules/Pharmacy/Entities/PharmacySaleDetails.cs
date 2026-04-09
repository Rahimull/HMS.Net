using HMSApi.Models;

namespace HMSApi.Modules.Pharmacy.Entities;


public class PharmacySalesdetails : BaseEntity
{

    public string? BatchNumber { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }


    // Foreign Keys
    public int PharmacySaleId { get; set; } = null!;
    public int MedicineId { get; set; } = null!;

    // Navigation properties
    public PharmacySales PharmacySale { get; set; } = null!;
    public Medicines Medicine { get; set; } = null!;
}