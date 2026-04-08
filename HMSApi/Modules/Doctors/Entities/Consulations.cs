using HMSApi.Models;
using HMSApi.Mudoles.Doctors.Entities;
using HMSApi.Mudoles.Reception.Entities;
using Microsoft.VisualBasic;

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
    public Doctor Doctor { get; set; } = null!;
    // Navigation property to Patient
    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    // Navigation property to Prescriptions
}