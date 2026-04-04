namespace HMSApi.Models;

public class Supplier
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Contact { get; set; } = null!;
    public string Address  { get; set; }=null!;
    
    public ICollection<Medicine>? Medicines { get; set; }
    public ICollection<Purchase>? Purchases { get; set; }
}