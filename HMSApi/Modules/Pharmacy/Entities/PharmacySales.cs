using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Modules.Pharmacy.Entities;

public class PharmacySales : BaseEntity
{
    public DateTime SaleDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Notes { get; set; }

    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;

    public int PrescriptionId { get; set; }
    public Prescriptions Prescription { get; set; } = null!;

    public ICollection<PharmacySalesdetails> SaleDetails { get; set; } = new List<PharmacySalesdetails>();
}