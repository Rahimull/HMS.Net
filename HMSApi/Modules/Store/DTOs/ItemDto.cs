
using HMSApi.Common.Enums;

namespace HMSApi.Modules.Store.DTOs;

public class ItemDto
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public string? BrandName { get; set; }
    public string? GenericName { get; set; }

    public ItemType Type { get; set; }

    public string? Description { get; set; }

    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = null!;

    public int UnitId { get; set; }
    public string UnitName { get; set; } = null!;

    public string? Code { get; set; }
    public string? Barcode { get; set; }

    public bool IsActive { get; set; }
}