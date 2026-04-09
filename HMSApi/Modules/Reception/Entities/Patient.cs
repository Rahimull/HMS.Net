using System.ComponentModel.DataAnnotations;
using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Emergencies.Entities;
using HMSApi.Modules.Finance.Entities;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.Laboratory.Entities;
using HMSApi.Modules.Nursing.Entities;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Radiology.Entities;
using Microsoft.EntityFrameworkCore;

[Index(nameof(Phone), IsUnique = true)]
public class Patient : BaseEntity
{
    [Required, MaxLength(100)]
    public string FirstName { get; set; } = null!;

    [Required, MaxLength(100)]
    public string LastName { get; set; } = null!;

    [Range(1, 2)]
    public Gender Gender { get; set; }

    public DateOnly DOB { get; set; }

    [Required, Phone, MaxLength(20)]
    public string Phone { get; set; } = null!;

    [MaxLength(255)]
    public string? Address { get; set; }

    [MaxLength(50)]
    public string? NationalId { get; set; }

    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    // One-to-One
    public MedicalRecord MedicalRecord { get; set; } = null!;

    // بهتر: نام درست و نوع درست (بسته به کلاس شما)
    public ICollection<Consultation> Consultation { get; set; } = new List<Consultation>();

    public ICollection<Admission> Admissions { get; set; } = new List<Admission>();
    public ICollection<PharmacySales> PharmacySales { get; set; } = new List<PharmacySales>();
    public ICollection<LabOrder> LabOrders { get; set; } = new List<LabOrder>();
    public ICollection<ImagingOrders> ImagingOrders { get; set; } = new List<ImagingOrders>();
    public ICollection<Emergency> Emergencies { get; set; } = new List<Emergency>();
    public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
    public ICollection<PatientCare> PatientCare { get; set; } = new List<PatientCare>();
    public ICollection<VitalSigns> VitalSigns { get; set; } = new List<VitalSigns>();
}