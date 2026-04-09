using HMSApi.Models;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.OPD.Entities;


public class OPDPrescriptionDetails : BaseEntity
{
    public DateOnly OPDDate { get; set; }
    public string? Notes { get; set; }

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
    public int OPDPrescriptionId {get; set;}
    // Navigation property
    public Doctors Doctor { get; set; } = null!;

    // Foreign key to Patient
    public int PatientId { get; set; }
    // Navigation property
    public Patient Patient { get; set; } = null!;

    // Foreign key to Medication
    public int MedicineId { get; set; }   
    // Navigation property
    public Medicines Medicines { get; set; } = null!;
    public OPDPrescriptions? OPDPrescriptions {get; set;}


}