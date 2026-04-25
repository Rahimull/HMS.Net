using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Store.Entities;


[Index(nameof(CategoryId))]
[Index(nameof(UnitId))]
[Index(nameof(Name), nameof(CategoryId), IsUnique = true)]
public class Item : BaseEntity
{
    public string Name { get; set; } = null!;
    public ItemType Type { get; set; }

    public string? Description { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public int UnitId { get; set; }
    public Unit Unit { get; set; } = null!;

    public ICollection<ItemStock> ItemStocks { get; set; } = new List<ItemStock>();
}