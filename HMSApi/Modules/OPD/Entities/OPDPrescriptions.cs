
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.OPD.Entities;


public class OPDPrescriptions : BaseEntity
{
    public DateOnly OPDDate { get; set; }
    public string? Notes { get; set; }

    public string MedicationName { get; set; } = null!;
    public string Dosage { get; set; } = null!;
    public string Frequency { get; set; } = null!;
    public string Duration { get; set; } = null!;
    public string Instructions { get; set; } = null!;

    // Foreign key to OPDVisit
    public int OPDVisitId { get; set; }
    // Navigation property
    public OPDVisits OPDVisit { get; set; } = null!;

    // Foreign key to Doctor
    public int DoctorId { get; set; }   
    // Navigation property
    public Doctor Doctor { get; set; } = null!;

    // Foreign key to Patient
    public int PatientId { get; set; }
    // Navigation property
    public Patient Patient { get; set; } = null!;
    public ICollection<OPDPrescriptionDetails> OPDPrescriptionDetails {get; set;} = new List<OPDPrescriptionDetails>();
}