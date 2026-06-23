using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;


namespace HMSApi.Modules.Pharmacy.Entities;

public class SalePayment : BaseEntity
{
    public int SaleId { get; set; }
    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    public string? Notes { get; set; }
    public Sale Sale { get; set; } = null!;
}