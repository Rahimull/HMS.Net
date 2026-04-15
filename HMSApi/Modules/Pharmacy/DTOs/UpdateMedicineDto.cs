namespace HMSApi.Modules.Pharmacy.DTOs;


public record UpdateMedicineDto(
       string Name,
       string? GenericName,
       string Unit,
       string? Description,
       decimal Price,
       int StrockQuantity
);