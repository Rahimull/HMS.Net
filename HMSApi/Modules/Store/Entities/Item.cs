using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Store.Entities;


[Index(nameof(CategoryId))]
[Index(nameof(UnitId))]
[Index(nameof(Name), nameof(CategoryId), nameof(UnitId), IsUnique = true)]
[Index(nameof(Code), IsUnique =true)]
[Index(nameof(Barcode), IsUnique = true)]
public class Item : BaseEntity
{
    public string Name { get; set; } = null!;
    public string? BrandName { get; set; }
    public string? GenericName { get; set; }
    public ItemType Type { get; set; }

    public string? Description { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public int UnitId { get; set; }
    public Unit Unit { get; set; } = null!;
    public string? Code { get; set; }
    public string? Barcode { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<ItemStock> ItemStocks { get; set; } = new List<ItemStock>();
}