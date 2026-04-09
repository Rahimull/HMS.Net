using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;

namespace HMSApi.Modules.Emergencies.Entities;

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
    public Emergency Emergency { get; set; } = null!;
    public Doctor Doctor { get; set; } = null!;
}