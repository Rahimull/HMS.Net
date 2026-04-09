using System.ComponentModel.DataAnnotations;
using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;
using Microsoft.EntityFrameworkCore;

[Index(nameof(AppointmentDate), nameof(DoctorId))]
public class Appointment : BaseEntity
{
    [Range(1, 3)]
    public AppointmentStatus AppointmentStatus { get; set; } = AppointmentStatus.Pending;

    [Required]
    public DateOnly AppointmentDate { get; set; }

    [Required]
    public TimeOnly AppointmentTime { get; set; }

    [MaxLength(255)]
    public string? Notes { get; set; }

    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;

    public int DepartmentId { get; set; }
    public Department Department { get; set; } = null!;
}