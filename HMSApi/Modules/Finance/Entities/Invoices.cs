using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Emergencies.Entities;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.OPD.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.Finance.Entities;

public class Invoice : BaseEntity
{
    public decimal Amount { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime InvoiceDate { get; set; }
    public string? Description { get; set; }
    public InvoiceStatus Status { get; set; } = InvoiceStatus.Pending;
    public string? Notes { get; set; }

    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    public int? OPDVisitId { get; set; }
    public OPDVisits? OPDVisit { get; set; }

    public int? AdmissionId { get; set; }
    public Admission? Admission { get; set; }

    public int? EmergencyId { get; set; }
    public Emergency? Emergency { get; set; }

    public ICollection<InvoiceDetails> InvoiceDetails { get; set; } = new List<InvoiceDetails>();
    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
