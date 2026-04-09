using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
namespace HMSApi.Modules.Doctors.Entities;


public class Schedules : BaseEntity
{

    public DateOnly ScheduleDate { get; set; }
    public DayOfWeek DayOfWeek {get; set;} = DayOfWeek.Saturday;
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }

    public int MaxPatients { get; set; }

    // Navigation property to Doctor
    [ForeignKey(nameof(DoctorId))]
    public int DoctorId { get; set; }
    [Required]
    public Doctors Doctors { get; set; } = null!;
}