
namespace HMSApi.Modules.Store.DTOs;

public record CreateItemStockDto(
   int Quantity,
   string Location,
  string? BatchNumber,
  DateOnly ExpiryDate,
   int ItemId
);