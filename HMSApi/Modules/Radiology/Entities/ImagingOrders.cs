using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.OPD.Entities;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.Radiology.Entities;


public class ImagingOrders : BaseEntity
{
    public string Modality { get; set; } = null!;
    public string BodyPart { get; set; } = null!;
    public string? Findings { get; set; }
    public string? Impression { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime? ResultDate { get; set; }
    public string? Notes { get; set; }
    public string? Comments { get; set; }
    public Status Status { get; set; } = Status.Waiting;


    // foreign keys
    public int PatientId { get; set; }  
    public int DoctorId { get; set; }
    public int OPDVisitId { get; set; }
    public int AdmissionId { get; set; }

    // navigation properties
    public Patient Patient { get; set; } = null!;
    public Doctors Doctor { get; set; } = null!;
    public OPDVisits OPDVisit { get; set; } = null!;
    public Admissions Admission { get; set; } = null!;
}