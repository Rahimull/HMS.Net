namespace HMSApi.Modules.Pharmacy.DTOs;


public record UpdateMedicines(
       string Name,
       string? GenericName,
       string Unit,
       string? Description,
       decimal Price,
       int StrockQuantity
);