using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.OPD.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.Laboratory.Entities;

public class LabOrder : BaseEntity
{
    public DateTime OrderDate { get; set; }
    public string? Notes { get; set; }
    public LabOrderStatus Status { get; set; } = LabOrderStatus.Pending;

    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;

    public int LaboratoryId { get; set; }
    public Laboratory Laboratory { get; set; } = null!;

    public int? OPDVisitId { get; set; }
    public OPDVisits? OPDVisit { get; set; }

    public int? AdmissionId { get; set; }
    public Admission? Admission { get; set; }

    public List<LabOrderDetails> LabOrderDetails { get; set; } = new();
}