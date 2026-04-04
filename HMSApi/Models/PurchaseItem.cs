namespace  HMSApi.Models;

public class PurchaseItem
{
    public int Id { get; set; }
    public int PurchaseId { get; set; } 
    public Purchase Purchase { get; set; }=null!;
    public int MedicineId { get; set; }
    public Medicine Medicine { get; set; }=null!;

    public int Quantity { get; set; }
    public decimal Price { get; set; }
}