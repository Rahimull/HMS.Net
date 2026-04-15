namespace HMSApi.Modules.Store.DTOs;


public record PurchaseDetailsDto(
        int Id,
       int Quantity,
       decimal UnitPrice,
       decimal SubTotal,
       string? BatchNumber,
       DateOnly ExpiryDate,
       int PurchaseId,
       int ItemId
);