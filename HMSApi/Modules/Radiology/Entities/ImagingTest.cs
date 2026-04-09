using HMSApi.Models;

namespace HMSApi.Modules.Radiology.Entities;


public class ImagingTest : BaseEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string Modality { get; set; } = null!;
    public decimal Price { get; set; }
}