
namespace HMSApi.Modules.Finance.DTOs;


public record UpdateInvoiceDetailsDto(
       string ServiceType,
       int ServiceId,
       decimal UnitPrice,
       int Quantity,
       decimal SubTotal,
       string? Description,
       DateTime InvoiceDate
);