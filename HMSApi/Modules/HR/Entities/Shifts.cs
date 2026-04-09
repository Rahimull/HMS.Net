using HMSApi.Models;
using HMSApi.Modules.SupportServices.Entities;

namespace HMSApi.Modules.HR.Entities;


public class Shifts : BaseEntity
{
    public DateOnly ShiftDate { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public string? Notes { get; set; }

    // Foriegn Keys 
    public int EmployeeId { get; set; }

    // Navigation Property
    public Employees Employees { get; set; } = null!;

    public ICollection<SupportStaff> SupportStaff { get; set; } = new List<SupportStaff>();
}