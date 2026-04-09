using HMSApi.Models;

namespace HMSApi.Modules.Finance.Entities;


public class InvoiceDetails : BaseEntity
{

    public string ServiceType { get; set; } = null!;
    public int ServiceId { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal SubTotal { get; set; }
    public string? Description { get; set; }
    public DateTime InvoiceDate { get; set; }



    // foreign keys
    public int InvoiceId { get; set; }

    // navigation properties
    public Invoices Invoice { get; set; } = null!;
}