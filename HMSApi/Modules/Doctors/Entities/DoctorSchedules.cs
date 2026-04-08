using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
namespace HMSApi.Mudoles.Doctors.Entities;


public class DoctorSchedules : BaseEntity
{

    public DateOnly ScheduleDate { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }

    public int MaxPatients { get; set; }

    // Navigation property to Doctor
    [ForeignKey(nameof(DoctorId))]
    public int DoctorId { get; set; }
    [Required]
    public Doctor Doctor { get; set; } = null!;
}