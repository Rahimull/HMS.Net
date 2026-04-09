using HMSApi.Models;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.IPD.Entities;

public class Admissions : BaseEntity
{

    public DateTime AdmissionDate { get; set; }
    public DateTime? DischargeDate { get; set; }
    public string? Diagnosis { get; set; }
    public string? TreatmentPlan { get; set; }

    public string? Notes { get; set; }


    // Foreign Keys patient
    public string PatientId { get; set; } = null!;
    // navigation property    
    public Patient Patient { get; set; } = null!;


    // Foreign Keys bed
    public string BedId { get; set; } = null!;
    // navigation property    
    public Beds Bed { get; set; } = null!;

    // foreign key doctor
    public string DoctorId { get; set; } = null!;
    // navigation property
    public Doctors Doctor { get; set; } = null!;

    public ICollection<IPDConsultations> IPDConsultations {get; set;} = new List<IPDConsultations>();
}