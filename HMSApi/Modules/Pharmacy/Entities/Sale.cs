using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Pharmacy.Entities;

[Index(nameof(InvoiceNumber), IsUnique = true)]
public class Sale : BaseEntity
{
    public DateTime SaleDate { get; set; } = DateTime.UtcNow;

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalProfit { get; set; }
    public string? Notes { get; set; }
    // public bool IsPaid { get; set; }

    // updatet Sate eneytity
    [Column(TypeName = "decimal(18,2)")]
    public decimal PaidAmount { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal RemainingAmount { get; set; }
    public PaymentStatus PaymentStatus { get; set; }

    public string? InvoiceNumber { get; set; }

    public int? PatientId { get; set; }
    public Patient? Patient { get; set; }

    public int? DoctorId { get; set; }
    public Doctor? Doctor { get; set; }

    public int? PrescriptionId { get; set; }

    public ICollection<SaleDetails> SaleDetails { get; set; } = new List<SaleDetails>();
    public ICollection<SalePayment> SalePayments { get; set; } = new List<SalePayment>();
}