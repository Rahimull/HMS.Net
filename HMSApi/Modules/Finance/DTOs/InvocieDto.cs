using HMSApi.Common.Enums;

namespace HMSApi.Modules.Finance.DTOs;


public record InvoiceDto(
        int Id,
        decimal Amount,
        decimal TotalAmount,
       DateTime InvoiceDate,
       string? Description,
       InvoiceStatus Status,
       string? Notes,
       int PatientId,
       int? OPDVisitId ,
       int? AdmissionId,
       int? EmergencyId 
);