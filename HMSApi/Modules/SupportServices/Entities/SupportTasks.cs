using HMSApi.Common.Enums;
using HMSApi.Models;

namespace HMSApi.Modules.SupportServices.Entities;


public class SupportTasks: BaseEntity
{
    public DateTime TaskDate { get; set; }
    public string Location { get; set; } = null!;
    public Status Status { get; set; } = Status.Waiting;
    public string? Notes { get; set; }
    public TaskType TaskType { get; set; } = TaskType.Pending;

    // foriegn keys
    public int StaffId { get; set; }

    // Navigation Property
    public SupportStaff SupportStaff { get; set; } = null!;
}