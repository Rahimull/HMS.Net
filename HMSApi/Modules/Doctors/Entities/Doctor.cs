using System.ComponentModel.DataAnnotations;
using HMSApi.Models;
using HMSApi.Modules.Emergencies.Entities;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.Laboratory.Entities;
using HMSApi.Modules.OPD.Entities;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Radiology.Entities;
using HMSApi.Modules.Reception.Entities;
namespace HMSApi.Modules.Doctors.Entities;

public class Doctor : BaseEntity
{
    [Required, MaxLength(100)]
    public string FirstName { get; set; } = null!;

    [Required, MaxLength(100)]
    public string LastName { get; set; } = null!;

    [Required, MaxLength(150)]
    public string Specialization { get; set; } = null!;

    [Required, EmailAddress]
    public string Email { get; set; } = null!;

    public bool IsActive { get; set; } = false;

    public decimal Fee { get; set; }

    [Required, Phone, MaxLength(20)]
    public string PhoneNumber { get; set; } = null!;

    public int DepartmentId { get; set; }
    public Department Department { get; set; } = null!;

    public ICollection<Schedules> Schedules { get; set; } = new List<Schedules>();
    public ICollection<Consultation> Consultations { get; set; } = new List<Consultation>();

    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    public ICollection<OPDVisits> OPDVisits { get; set; } = new List<OPDVisits>();
    public ICollection<Admission> Admission { get; set; } = new List<Admission>();
    public ICollection<PharmacySales> PharmacySales { get; set; } = new List<PharmacySales>();
    public ICollection<LabOrder> LabOrder { get; set; } = new List<LabOrder>();
    public ICollection<ImagingOrders> ImagingOrders { get; set; } = new List<ImagingOrders>();
    public ICollection<EmergencyTreatments> EmergencyTreatments { get; set; } = new List<EmergencyTreatments>();
}