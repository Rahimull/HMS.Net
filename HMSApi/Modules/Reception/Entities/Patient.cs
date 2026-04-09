using System.ComponentModel.DataAnnotations;
using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Finance.Entities;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.Laboratory.Entities;
using HMSApi.Modules.Nursing.Entities;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Radiology.Entities;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Reception.Entities;

// Phone is Index
[Index(nameof(Phone), IsUnique = true)]
public class Patient : BaseEntity
{
    // First Name Of Patient
    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = null!;

    // Last Name Of Patient
    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = null!;

    // Patient Gender that is enum like Gender = {Male=1, Female=2}
    [Range(1, 2)]
    public Gender Gender { get; set; }

    // Patient Date Of Birth
    public DateOnly DOB { get; set; }

    // Patient phone number this also Indix
    [Required]
    [Phone]
    [MaxLength(20)]
    public string Phone { get; set; } = null!;


    // patient Address
    [MaxLength(255)]
    public string? Address { get; set; }

    // pateint National Id Card number
    [MaxLength(50)]
    public string? NationalId { get; set; }

    // one-to-many Navivation
    [Required]
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    // One-to-One 
    [Required]
    public MedicalRecord MedicalRecord { get; set; } = null!;

    // one-to-many Navigation
    public ICollection<Consulations> Consulations { get; set; } = new List<Consulations>();

    // Navigation Properties
    public ICollection<Doctors> Doctors { get; set; } = new List<Doctors>();
    public ICollection<Admissions> Admissions {get; set;} = new List<Admissions>();
    public Beds? Beds {get; set;}
    public ICollection<PharmacySales> PharmacySales {get; set;} = new List<PharmacySales>();
    public ICollection<LabOrders> LabOrders {get; set;} = new List<LabOrders>();
    public ICollection<ImagingOrders> ImagingOrders {get; set;} = new List<ImagingOrders>();

    public ICollection<Emergency> Emergencies { get; set; } = new List<Emergency>();

    public ICollection<Invoices> Invoices { get; set; } = new List<Invoices>();
    public ICollection<PatientCare> PatientCare { get; set; } = new List<PatientCare>();
    public ICollection<VitalSigns> VitalSigns { get; set; } = new List<VitalSigns>();

    
}