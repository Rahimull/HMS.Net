using HMSApi.Models;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.Doctors.Entities;


public class Prescriptions : BaseEntity
{
    public string MedicationName { get; set; } = null!;
    public string Dosage { get; set; } = null!;
    public string Frequency { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    // Navigation property to Consultation
    public int ConsultationId { get; set; }
    public Consulations Consultation { get; set; } = null!;

    // Navigation property to Doctor
    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;

    // Navigation property to Patient.
    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;
}