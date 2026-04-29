namespace HMSApi.Modules.Pharmacy.DTOs;


public record CreateSaleDetailsDto(
       string? BatchNumber,
       int Quantity,
       decimal UnitPrice,
       decimal TotalPrice,
       int SaleId,
       int MedicineId
);