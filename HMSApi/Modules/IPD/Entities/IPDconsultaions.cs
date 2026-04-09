using HMSApi.Models;

namespace HMSApi.Modules.IPD.Entities;


public class IPDConsultations : BaseEntity
{
    
    public DateTime ConsultationDate { get; set; }
    public string? Notes { get; set; }


    // Foreign Keys
    public string AdmissionId { get; set; } = null!;
    public string DoctorId { get; set; } = null!;

    // Navigation properties
    public Admissions Admission { get; set; } = null!;
    public Doctors Doctor { get; set; } = null!;


}