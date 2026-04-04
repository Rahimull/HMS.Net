namespace HMSApi.Models;

public class Medicine
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public decimal Price { get; set; }
    public decimal PurchasPrice {get; set;}
    public int Quantity { get; set; }

    public int SupplierId { get; set; }
    public Supplier Supplier { get; set; } = null!;
    public ICollection<SaleItem>? SaleItems { get; set; }
    public ICollection<PurchaseItem>? PurchaseItems { get; set; }
}