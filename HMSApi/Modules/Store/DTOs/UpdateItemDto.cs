
namespace HMSApi.Modules.Store.DTOs;

public record UpdateItemDto(
   string Name,
  string Category,
  string? Description,
  string Unit,
  decimal Price,
   int QuantityInStock
);