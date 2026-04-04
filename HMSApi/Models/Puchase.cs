namespace HMSApi.Models;


public class Purchase
{
    public int Id { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;

    public int SupplierId { get; set; }
    public Supplier Supplier { get; set; } = null!;

    public decimal TotalAmount { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public ICollection<PurchaseItem>? PurchaseItems { get; set; }
    public ICollection<FinanceTransaction>? FinanceTransactions { get; set; }
    
}