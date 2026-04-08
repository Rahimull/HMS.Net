using HMSApi.Models;

namespace HMSApi.Modules.Doctors.Entities;

public class PrescriptionDetails : BaseEntity
{
    public string MedicationName { get; set; } = null!;
    public string Dosage { get; set; } = null!;
    public string Frequency { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}