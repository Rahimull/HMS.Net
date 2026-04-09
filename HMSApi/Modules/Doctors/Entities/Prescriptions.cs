using HMSApi.Models;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.Doctors.Entities;


public class Prescriptions : BaseEntity
{

    // Navigation property to Consultation
    public int ConsultationId { get; set; }
    public Consultations Consultation { get; set; } = null!;

    // Navigation property to Doctor
    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;

    // Navigation property to Patient.
    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    // Navigation property to PrescriptionDetails
    public ICollection<PrescriptionDetails> PrescriptionDetails { get; set; } = new List<PrescriptionDetails>();
}