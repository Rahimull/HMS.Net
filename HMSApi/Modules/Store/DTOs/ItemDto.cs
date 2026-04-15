
namespace HMSApi.Modules.Store.DTOs;

public record ItemDto(
        int Id,
   string Name,
  string Category,
  string? Description,
  string Unit,
  decimal Price,
   int QuantityInStock
);