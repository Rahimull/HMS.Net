namespace HMSApi.Models;


public class SaleItem
{
    public int Id { get; set; }
    public int SaleId { get; set; }
    public Sale Sale { get; set; }=null!;

    public int MedicineId { get; set; }
    public Medicine Medicine { get; set; }=null!;

    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal PurchasePrice { get; set; }
}