using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using HMSApi.Modules.Emergency.Entities;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.Laboratory.Entities;
using HMSApi.Modules.OPD.Entities;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Radiology.Entities;
using HMSApi.Modules.Reception.Entities;
namespace HMSApi.Modules.Doctors.Entities;


public class Doctors : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = null!;
    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = null!;
    [Required]
    [MaxLength(150)]
    public string Specialization { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;
    public bool IsActive { get; set; } = false;
    public decimal Fee { get; set; }

    [Required]
    [Phone]
    [MaxLength(20)]
    public string PhoneNumber { get; set; } = null!;

    // Navigation property for Appointments
    [InverseProperty(nameof(Department.Id))]
    [ForeignKey(nameof(DepartmentId))]
    public int DepartmentId { get; set; }
    public Department Department { get; set; } = null!;

    // Navigation property for DoctorSchedules
    public ICollection<Schedules> Schedules { get; set; } = new List<Schedules>();

    // Navigation property for Consulations
    public ICollection<Consulations> Consulations { get; set; } = new List<Consulations>();
    public ICollection<Appointment> Appointments {get; set;} = new List<Appointment>();
    public ICollection<OPDVisits> OPDVisits {get; set; } = new List<OPDVisits>();

    public ICollection<Admissions> Admissions {get; set;} = new List<Admissions>();

    public ICollection<PharmacySales> PharmacySales {get; set;} = new List<PharmacySales>();

    public ICollection<LabOrders> LabOrders {get; set;} = new List<LabOrders>();

    public ICollection<ImagingOrders> ImagingOrders {get; set;} = new List<ImagingOrders>();

    public ICollection<EmergencyTreatments> EmergencyTreatments { get; set; } = new List<EmergencyTreatments>();
}