using System.ComponentModel.DataAnnotations;
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.User.Entities;
namespace HMSApi.Modules.Reception.Entities;


public class Department : BaseEntity
{
    // Department Name
    [Required]
    [MaxLength(100)]
    public string Name  { get; set; } = null!;
    [MaxLength(255)]

    // Department Description
    public string? Description { get; set; }

    // Navigation Property
    public ICollection<Doctor> Doctors {get; set;} = new List<Doctor>();
    public ICollection<Appointment> Appointments{get; set;} = new List<Appointment>();
    public ICollection<AppUser> Users { get; set; } = new List<AppUser>();
}