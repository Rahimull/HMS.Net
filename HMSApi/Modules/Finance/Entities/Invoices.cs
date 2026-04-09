using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Emergency.Entities;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.OPD.Entities;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.Finance.Entities;


public class Invoices : BaseEntity
{
    public decimal Amount { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime InvoiceDate { get; set; }
    public string? Description { get; set; }
    public InvoiceStatus Status { get; set; } = InvoiceStatus.Pending;

    public string? Notes { get; set; }

    // foreign keys
    public int PatientId { get; set; }
    public int? OPDVisitId { get; set; }
    public int? AdmissionId { get; set; }
    public int? EmergencyVisitId { get; set; }


    // navigation properties
    public Patient Patient { get; set; } = null!;
    public OPDVisits? OPDVisit { get; set; }
    public Admissions? Admission { get; set; }
    public EmergencyTreatments? EmergencyVisit { get; set; }
}