namespace HMSApi.Models;


public class Sale
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal TotalCost { get; set; }
    public decimal Profit { get; set; }
    public int UserId  { get; set; }
    public User User { get; set; } = null!;

    public int CustomerId { get; set; } 
    public Customer? Customer { get; set; }

    public ICollection<SaleItem>? SaleItemes { get; set; }
    public ICollection<FinanceTransaction>?  FinanceTransactions  { get; set; }
}