namespace HMSApi.Modules.Store.DTOs;

public record CreateCurrentStockDto(
    int Quantity,
    int ItemId
);