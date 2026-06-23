namespace HMSApi.Modules.Pharmacy.DTOs;
public class SalePaymentDto
{
    public int Id { get; set; }
    public DateTime PaymentDate { get; set; }
    public int SaleId { get; set; }
    public decimal Amount { get; set; }
    public string? Notes { get; set; }
}