namespace HMSApi.Modules.Pharmacy.DTOs;
public class CreateSalePaymentDto
{
    public int SaleId { get; set; }
    public decimal Amount { get; set; }
    public string? Notes { get; set; }
}