namespace HMSApi.Modules.Store.DTOs;


public record CreatePurchaseDto
(
       int SupplierId,
       string? Notes,
       DateTime PurchaseDate,
       List<CreatePurchaseDetailDto> Items
);
