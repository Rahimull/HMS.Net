using HMSApi.Models;

namespace HMSApi.Modules.Finance.Entities;



public class Payments : BaseEntity
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
    public Invoices Invoice { get; set; } = null!;
}