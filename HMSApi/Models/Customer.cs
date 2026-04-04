namespace HMSApi.Models;

public class Customer
{
    public int Id  { get; set; }
    public string Name { get; set; }=null!;
    public string Contact { get; set; }=null!;
    public string Address { get; set; }=null!;

    public ICollection<Sale>? Sales { get; set; }
    public ICollection<Prescription>? Prescriptions { get; set; }
}