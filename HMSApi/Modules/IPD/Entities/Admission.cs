using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.IPD.Entities;

public class Admission : BaseEntity
{
    public DateTime AdmissionDate { get; set; }
    public DateTime? DischargeDate { get; set; }
    public string? Diagnosis { get; set; }
    public string? TreatmentPlan { get; set; }
    public string? Notes { get; set; }

    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    public int BedId { get; set; }
    public Beds Bed { get; set; } = null!;

    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;

    public ICollection<IPDConsultation> IPDConsultations { get; set; } = new List<IPDConsultation>();
}
