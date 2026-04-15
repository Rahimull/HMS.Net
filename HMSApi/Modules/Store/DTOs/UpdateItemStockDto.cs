
namespace HMSApi.Modules.Store.DTOs;

public record UpdateItemStockDto(
   int Quantity,
   string Location,
  string? BatchNumber,
  DateTime LastUpdated,
  DateOnly ExpiryDate,
   int ItemId
);