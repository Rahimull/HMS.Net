namespace HMSApi.Modules.Store.DTOs;


public record UpdatePurchasesDto(
       int Quantity,
       decimal TotalPrice,
       DateTime PurchaseDate,
       string? Notes,
       int ItemId,
       int SupplierId
);