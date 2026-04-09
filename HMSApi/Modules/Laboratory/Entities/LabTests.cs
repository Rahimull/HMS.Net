using HMSApi.Common.Enums;
using HMSApi.Models;

namespace HMSApi.Modules.Laboratory.Entities;

public class LabTests : BaseEntity
{
    public string Name { get; set; } = null!;
    public TestType Type { get; set; } = TestType.BloodTest;
    public string? Unit {get; set;} 
    public string? ReferenceRange {get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }

    public ICollection<LabOrderDetails> LabOrderDetails {get; set;} = new List<LabOrderDetails>();
}
