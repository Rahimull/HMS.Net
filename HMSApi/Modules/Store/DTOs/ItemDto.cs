
namespace HMSApi.Modules.Store.DTOs;

public record ItemDto(
    int Id,
    string Name,
    string? Description,
    decimal Price,
    string Type,
    int CategoryId,
    string CategoryName,
    int UnitId,
    string UnitName
);