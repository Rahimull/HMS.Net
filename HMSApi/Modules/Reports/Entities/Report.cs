using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.HR.Entities;

namespace HMSApi.Modules.Reports.Entities;


public class Report : BaseEntity
{
    public string ReportType { get; set; } = null!;
    public DateTime GeneratedAt { get; set; }

    public DateOnly PeriodStart { get; set; }
    public DateOnly PeriodEnd { get; set; }
    public string? Notes { get; set; }
    public string? FilePath { get; set; }

    public ReportStatus Status { get; set; }

    // foriegn key
    public int GeneratedBy { get; set; }

    // Navigation Property
    public Employees Employees { get; set; } = null!;
}