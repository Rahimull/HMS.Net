using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.Pharmacy.Entities;

public class Sale : BaseEntity
{
    public DateTime SaleDate { get; set; } = DateTime.UtcNow;
    public decimal TotalAmount { get; set; }
    public string? Notes { get; set; }
    public bool IsPaid {get; set;}

    public int? PatientId { get; set; }

    public int? DoctorId { get; set; }

    public int? PrescriptionId { get; set; }

    public ICollection<SaleDetails> SaleDetails { get; set; } = new List<SaleDetails>();
}