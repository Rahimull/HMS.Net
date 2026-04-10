using HMSApi.Models;

namespace HMSApi.Modules.Laboratory.Entities;


public class Laboratory : BaseEntity
{
    public string Name { get; set; } = null!;
    public string? Location { get; set; }
    public string? ContactInfo { get; set; }

    // navigation properties
    public List<LabOrder> LabOrders { get; set; } = new List<LabOrder>();
}