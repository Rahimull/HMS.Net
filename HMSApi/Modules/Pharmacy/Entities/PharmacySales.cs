using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.Pharmacy.Entities;


public class PharmacySales : BaseEntity
{
    public DateTime SaleDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Notes { get; set; }

    // Foreign Keys
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public int PrescriptionId { get; set; }


    // Navigation properties
    public Patient Patient { get; set; } = null!;
    public Doctors Doctor { get; set; } = null!;
    public Prescriptions Prescription { get; set; } = null!;