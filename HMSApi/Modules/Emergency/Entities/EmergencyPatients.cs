using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.Emergency.Entities;


public class EmergencyPatients : BaseEntity
{
    public string Name { get; set; } = null!;
    public int Age { get; set; }
    public Gender Gender { get; set; } = Gender.Unknown;
    public string? ContactNumber    { get; set; }
    public DateTime ArrivedAt { get; set; }
    public TriageLevel TriageLevel { get; set; } = TriageLevel.Low;
    public Status Status { get; set; } = Status.Cancelled;
    public string? Notes { get; set; }

    // foreign keys
    public int? DoctorId { get; set; }
    public int patientId { get; set; }

    // navigation properties
    public Doctors? Doctor { get; set; }
    public Patient Patient { get; set; } = null!;

}