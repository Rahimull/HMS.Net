namespace HMSApi.Modules.Store.DTOs;


public record UpdatePurchaseDetailsDto(
       int Quantity,
       decimal UnitPrice,
       string? BatchNumber,
       DateOnly ExpiryDate,
       int ItemId
);