using System.ComponentModel.DataAnnotations;
using HMSApi.Models;
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
    public ICollection<Doctors> Doctors {get; set;} = new List<Doctors>();
    public ICollection<Appointment> Appointments{get; set;} = new List<Appointment>();
}