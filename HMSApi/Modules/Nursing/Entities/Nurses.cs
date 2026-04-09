using HMSApi.Models;

namespace HMSApi.Modules.Nursing.Entities;


public class Nurses : BaseEntity
{
    public string Name { get; set; } = null!;
    public string EmpoyeeNumber { get; set; } = null!;
    public string Shift { get; set; } = null!;
    
    public string ContactInfo { get; set; } = null!;
    public string? Address { get; set; }
    public string Department { get; set; } = null!;

    // Navigarion Properties
    public ICollection<PatientCare> PatientCares { get; set; } = new List<PatientCare>();
    public ICollection<VitalSigns> VitalSignss { get; set; } = new List<VitalSigns>();


}