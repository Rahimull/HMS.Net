using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Reception.Entities;

public class ReceptionDoctor : BaseEntity
{
    // Doctor Full Name 
    [Required]
    [MaxLength(150)]
    public string FullName { get; set; } = null!;
    // Doctor Fee
    [Precision(10, 2)]
    public decimal Fee { get; set; }

    // FK form Department
    [Required]
    [ForeignKey(nameof(DepartmentId))]
    public int DepartmentId { get; set; }

    // Navigation form Department
    [Required]
    public Department Department { get; set; } = null!;

    // Navigation from Appointment
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}