using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Mudoles.Reception.Entities;

[Index(nameof(AppointmentDate), IsUnique = true)]
public class Appointment : BaseEntity<int>
{
    // Appointment Status = {Pending=1, Completed=2, Cancelled=3}
    // Defalt is Pending
    [Range(1, 3)]
    public AppointmentStatus AppointmentStatus { get; set; } = AppointmentStatus.Pending;

    // Appointment date only
    public DateOnly AppointmentDate { get; set; }

    // appointment Time Only
    public TimeOnly AppointmentTime { get; set; }
    [MaxLength(255)]

    // Appointment Notes from doctor
    public string? Notes { get; set; }


    // FK from Patient
    [ForeignKey(nameof(PatientId))]
    public int PatientId { get; set; }

    // Navigation from Patient
    [Required]
    public Patient Patient { get; set; } = null!;

    // Fk from Doctors
    [ForeignKey(nameof(DoctorId))]
    public int DoctorId { get; set; }

    // Navigation form Doctors
    [Required]
    public Doctor Doctor { get; set; } = null!;

    // FK from Department 
    [ForeignKey(nameof(DepartmentId))]
    public int DepartmentId { get; set; }

    // Navigation from Department
    [Required]
    public Department Departemnt { get; set; } = null!;
}