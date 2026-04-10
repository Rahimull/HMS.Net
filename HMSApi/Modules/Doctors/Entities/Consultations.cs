using HMSApi.Models;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.Doctors.Entities;

public class Consultation : BaseEntity
{
    public DateTime VisitDate { get; set; }
    public string ChiefComplaint { get; set; } = null!;
    public string Examination { get; set; } = null!;
    public string Notes { get; set; } = null!;

    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;

    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    public ICollection<Diagnosis> Diagnosis { get; set; } = new List<Diagnosis>();
    public ICollection<Prescriptions> Prescriptions { get; set; } = new List<Prescriptions>();
}
