using HMSApi.Models;

namespace HMSApi.Modules.Doctors.Entities;

public class Diagnoses : BaseEntity
{
    public string DiagnosisName { get; set; } = null!;
    public string DiagnosisDetails { get; set; } = null!;
    public DateTime DiagnosisDate { get; set; }

    // Navigation property to Consultation
    public int ConsultationId { get; set; }
    public Consulations Consultation { get; set; } = null!;

}