using HMSApi.Models;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.Reception.Entities;


namespace HMSApi.Modules.Nursing.Entities;


public class PatientCare : BaseEntity
{
   
    public string CareDescription { get; set; } = null!;
    public DateTime CareDate { get; set; }


    // Foreign key to Patients
     public int PatientId { get; set; } 
    public int NurseId { get; set; } 
    public int AdmissionId { get; set; }


    // navigation properties
    public Patient Patient { get; set; } = null!;
    public Nurses Nurse { get; set; } = null!;
    public Admission Admission { get; set; } = null!;
}