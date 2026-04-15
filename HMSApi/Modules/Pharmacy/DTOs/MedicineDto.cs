namespace HMSApi.Modules.Pharmacy.DTOs;


public record MedicineDto(
        int Id,
       string Name,
       string? GenericName,
       string Unit,
       string? Description,
       decimal Price,
       int StockQuantity
);