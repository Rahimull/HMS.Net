using System.ComponentModel.DataAnnotations;
using HMSApi.Models;
using HMSApi.Modules.Store.Entities;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Common.Entities;


[Index(nameof(Name), IsUnique =true)]
public class Unit: BaseEntity
{
    [Required]
    [MaxLength(100)]
    public String Name { get; set; } = null!;
    public ICollection<Item> Items { get; set; } = new List<Item>();
}