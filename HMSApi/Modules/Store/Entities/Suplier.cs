using System.ComponentModel.DataAnnotations;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Store.Entities;



[Index(nameof(Name), IsUnique =true)]
[Index(nameof(ContactInfo), IsUnique =true)]
public class Suppliers : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    [MaxLength(20)]
    public string ContactInfo { get; set; } = null!;
    public string? Address { get; set; }

    public ICollection<Purchases> Purchases { get; set; } = new List<Purchases>();
    
}