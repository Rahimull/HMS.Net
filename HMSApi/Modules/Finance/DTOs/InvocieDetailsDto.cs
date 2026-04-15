using HMSApi.Common.Enums;

namespace HMSApi.Modules.Finance.DTOs;


public record InvoiceDetailsDto(
        int Id,
       string ServiceType,
       int ServiceId,
       decimal UnitPrice,
       int Quantity,
       decimal SubTotal,
       string? Description,
       DateTime InvoiceDate

);
