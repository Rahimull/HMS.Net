using HMSApi.Models;

namespace HMSApi.Modules.Emergency.Entities;

public class EmergencyTreatments : BaseEntity
{
    public string TreatmentDescription { get; set; } = null!;
    public DateTime TreatmentDate { get; set; }
    public string? Notes { get; set; }
    public string? Outcome { get; set; }


    // foreign keys
    public int emergencyPatientId { get; set; }
    public int DoctorId { get; set; }


    // navigation properties
    public EmergencyPatients EmergencyPatient { get; set; } = null!;
    public Doctors Doctor { get; set; } = null!;
}