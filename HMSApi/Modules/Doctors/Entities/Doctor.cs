using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Mudoles.Doctors.Entities;


class Doctor : BaseEntity
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
    public ICollection<DoctorSchedules> DoctorSchedules { get; set; } = new List<DoctorSchedules>();
}