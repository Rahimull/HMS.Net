using HMSApi.Models;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Store.Entities;

namespace HMSApi.Modules.Doctors.Entities;

public class PrescriptionDetails : BaseEntity
{
    public string MedicationName { get; set; } = null!;
    public string Dosage { get; set; } = null!;
    public string Frequency { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    // Navigation property to Prescription
    public int PrescriptionId { get; set; }
    public Prescriptions Prescription { get; set; } = null!;

    // Navigation property to Medicine 
    public int MedicineId { get; set; }
    public Item Item { get; set; } = null!;
}