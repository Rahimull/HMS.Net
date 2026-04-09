using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;



public class Suppliers : BaseEntity
{
    public string Name { get; set; } = null!;
    public string ContactInfo { get; set; } = null!;
    public string? Address { get; set; }
    
}