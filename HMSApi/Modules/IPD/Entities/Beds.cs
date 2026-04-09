using HMSApi.Common.Enums;
using HMSApi.Models;

namespace HMSApi.Modules.IPD.Entities;

public class Beds : BaseEntity
{
    public string BedNumber { get; set; } = null!;
    public BedType BedType { get; set; } = BedType.General;
    public BedStatus BedStatus { get; set; } = BedStatus.Available;

    public string? Ward { get; set; }
    public bool IsOccupied { get; set; }
}
