namespace HMSApi.Modules.Store.DTOs;


public record CreatePurchaseDetailDto
(
    int ItemId,
    int Quantity,
    decimal UnitPrice,
    string? BatchNumber,
    DateOnly ExpiryDate
);