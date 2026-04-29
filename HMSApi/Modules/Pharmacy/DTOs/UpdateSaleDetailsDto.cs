namespace HMSApi.Modules.Pharmacy.DTOs;


public record UpdateSaleDetailsDto(
       string? BatchNumber,
       int Quantity,
       decimal UnitPrice,
       decimal TotalPrice,
       int SaleId,
       int MedicineId
);