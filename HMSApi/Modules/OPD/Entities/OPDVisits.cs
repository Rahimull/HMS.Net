using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.OPD.Entities;


public class OPDVisits : BaseEntity
{
    public DateOnly VisitDate { get; set; }
    public TimeOnly VisitTime { get; set; }
    public VisitType VisitType { get; set; }=VisitType.New;
    public Status VisitStatus { get; set; } = Status.Waiting;

    public int TokenNumber { get; set; }
    public string Notes { get; set; } = null!;
    public string? ReasonForVisit { get; set; }
    public string? Diagnosis { get; set; }
    public string? TreatmentPlan { get; set; }
    public decimal? BillingAmount { get; set; }


    // Foreign key to Patient
    public int PatientId { get; set; }
    // Navigation property
    public Patient Patient { get; set; } = null!;

    // Foreign key to Doctor
    public int DoctorId { get; set; }
    // Navigation property
    public Doctors Doctors { get; set; } = null!;

    // Foreign key to appointment
    public int AppointmentId { get; set; }
    // Navigation property
    public Appointment? Appointment { get; set; }
    public ICollection<OPDPrescriptions> OPDPrescriptions {get; set;} = new List<OPDPrescriptions>();
}