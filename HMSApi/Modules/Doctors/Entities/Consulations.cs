using HMSApi.Models;
using HMSApi.Mudoles.Reception.Entities;
namespace HMSApi.Modules.Doctors.Entities;

public class Consulations : BaseEntity
{
    public DateTime VisitDate { get; set; }
    public string ChiefComplaint { get; set; } = null!;
    public string Examination { get; set; } = null!;
   
    public DateTime ConsultationDate { get; set; }
    public string Notes { get; set; } = null!;

    // Navigation property to Doctor
    public int DoctorId { get; set; }   
    public Doctors Doctor { get; set; } = null!;
    // Navigation property to Patient
    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    // Navigation property to Prescriptions
    public ICollection<Diagnoses> Diagnoses {get; set;} = new List<Diagnoses>();
    public ICollection<Prescriptions> Prescriptions{get; set;} = new List<Prescriptions>();
}