namespace HMSApi.Modules.Store.DTOs;

public record CurrentStockDto(
    int Id,
    int ItemId,
    int Quantity,
    string ItemName,
    DateTime LastUpdate 
);