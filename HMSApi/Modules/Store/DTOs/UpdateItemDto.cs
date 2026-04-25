
using HMSApi.Common.Enums;

namespace HMSApi.Modules.Store.DTOs;

public record UpdateItemDto(
   string Name,
    string? Description,
    decimal Price,
    ItemType Type,
    int CategoryId,
    int UnitId
);