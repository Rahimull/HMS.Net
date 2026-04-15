namespace HMSApi.Modules.Pharmacy.DTOs;


public record Medicine(
        int Id,
       string Name,
       string? GenericName,
       string Unit,
       string? Description,
       decimal Price,
       int StrockQuantity
);