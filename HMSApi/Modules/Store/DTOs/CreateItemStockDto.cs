
namespace HMSApi.Modules.Store.DTOs;

public record CreateItemStockDto(
   int Quantity,
   string Location,
  string? BatchNumber,
  DateTime LastUpdated,
  DateOnly ExpiryDate,
   int ItemId
);