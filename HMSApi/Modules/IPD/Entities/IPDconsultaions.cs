using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;

namespace HMSApi.Modules.IPD.Entities;

public class IPDConsultation : BaseEntity
{
    public DateTime ConsultationDate { get; set; }
    public string? Notes { get; set; }

    public int AdmissionId { get; set; }
    public Admission Admission { get; set; } = null!;

    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;
}