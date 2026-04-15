namespace HMSApi.Modules.Finance.DTOs;


public record PaymentDto(
        int Id,
       decimal Amount,
       DateTime PaymentDate,
       string PaymentMethod,
       string? TransactionId,
       string? Notes,
       string? ReferenceNumber,
       int InvoiceId
);