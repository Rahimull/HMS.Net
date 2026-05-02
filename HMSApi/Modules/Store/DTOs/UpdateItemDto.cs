
using HMSApi.Common.Enums;

namespace HMSApi.Modules.Store.DTOs;

using System.ComponentModel.DataAnnotations;

public class UpdateItemDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = null!;

    [MaxLength(200)]
    public string? BrandName { get; set; }

    [MaxLength(200)]
    public string? GenericName { get; set; }

    [Required]
    public ItemType Type { get; set; }

    public string? Description { get; set; }

    [Required]
    public int CategoryId { get; set; }

    [Required]
    public int UnitId { get; set; }

    [MaxLength(100)]
    public string? Code { get; set; }

    [MaxLength(100)]
    public string? Barcode { get; set; }

    public bool IsActive { get; set; }
}