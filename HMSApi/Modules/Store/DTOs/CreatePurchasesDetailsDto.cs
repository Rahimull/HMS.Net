namespace HMSApi.Modules.Store.DTOs;


public record CreatePurchaseDetailsDto(
       int Quantity,
       decimal UnitPrice,
       decimal SubTotal,
       string? BatchNumber,
       DateOnly ExpiryDate,
       int PurchaseId,
       int ItemId
);