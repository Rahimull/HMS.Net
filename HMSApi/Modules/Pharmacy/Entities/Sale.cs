using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.Pharmacy.Entities;

public class Sale : BaseEntity
{
    public DateTime SaleDate { get; set; } = DateTime.UtcNow;

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalProfit { get; set; }
    public string? Notes { get; set; }
    public bool IsPaid { get; set; }

    public int? PatientId { get; set; }

    public int? DoctorId { get; set; }

    public int? PrescriptionId { get; set; }

    public ICollection<SaleDetails> SaleDetails { get; set; } = new List<SaleDetails>();
}