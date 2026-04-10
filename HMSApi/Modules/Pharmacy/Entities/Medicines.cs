using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;

namespace HMSApi.Modules.Pharmacy.Entities;


public class Medicines : BaseEntity
{
    public string Name { get; set; } = null!;
    public string? GenericName { get; set; }
    public string Unit { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }

// Navigation Properties
public ICollection<PrescriptionDetails> PrescriptionDetails {get; set;} = new List<PrescriptionDetails>();
public ICollection<MedicineStock> MedicineStocks {get; set;} = new List<MedicineStock>();

}