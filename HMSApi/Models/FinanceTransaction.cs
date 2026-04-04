namespace HMSApi.Models;

public class FinanceTransaction
{
    public int Id { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;
    public string Type { get; set; } =null!;
    public decimal Amount  { get; set; }
    public string Description { get; set; }=null!;

    public int? RelatedSaleId { get; set; }
    public Sale? RelatedSale { get; set; }

    public int? RelatedPurchaseId { get; set; }
    public Purchase? RelatedPurchase { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }=null!;

}