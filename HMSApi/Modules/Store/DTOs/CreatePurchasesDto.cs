namespace HMSApi.Modules.Store.DTOs;


public record CreatePurchasesDto(
       int Quantity,
       decimal TotalPrice,
       DateTime PurchaseDate,
       string? Notes,
       int ItemId,
       int SupplierId
);