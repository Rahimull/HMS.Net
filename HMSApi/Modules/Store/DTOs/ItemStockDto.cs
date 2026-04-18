
namespace HMSApi.Modules.Store.DTOs;

public record ItemStockDto(
        int Id,
   int Quantity,
   string Location,
  string? BatchNumber,
  DateOnly ExpiryDate,
   int ItemId,
   string? ItemName
);