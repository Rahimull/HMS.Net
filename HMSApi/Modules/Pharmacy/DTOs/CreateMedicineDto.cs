namespace HMSApi.Modules.Pharmacy.DTOs;


public record CreateMedicineDto(
       string Name,
       string? GenericName,
       string Unit,
       string? Description,
       decimal Price,
       int StockQuantity
);