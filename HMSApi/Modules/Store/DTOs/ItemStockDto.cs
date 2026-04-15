
namespace HMSApi.Modules.Store.DTOs;

public record ItemStockDto(
        int Id,
   int Quantity,
   string Location,
  string? BatchNumber,
  DateTime LastUpdated,
  DateOnly ExpiryDate,
   int ItemId
);