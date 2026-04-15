namespace HMSApi.Modules.Store.DTOs;


public record PurchasesDto(
        int Id,
       int Quantity,
       decimal TotalPrice,
       DateTime PurchaseDate,
       string? Notes,
       int ItemId,
       int SupplierId
);