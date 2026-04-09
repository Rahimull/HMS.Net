using HMSApi.Models;

namespace HMSApi.Modules.Finance.Entities;



public class Payment : BaseEntity
{
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public string PaymentMethod { get; set; } = null!;
    public string? TransactionId { get; set; }
    public string? Notes { get; set; }
    public string? ReferenceNumber { get; set; }

    // foreign keys
    public int InvoiceId { get; set; }

    // navigation properties
    public Invoice Invoice { get; set; } = null!;
}