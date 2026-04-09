using HMSApi.Models;
namespace HMSApi.Modules.Pharmacy.Entities;


public class MedicineStock : BaseEntity
{
    public string BatchNumber { get; set; } = null!;
    public int Quantity { get; set; }
    public DateOnly ExpiryDate { get; set; }
    public string? location { get; set; }
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;




    // Foreign Key
    public int MedicineId { get; set; }

    // Navigation property
    public Medicines Medicine { get; set; } = null!;
}