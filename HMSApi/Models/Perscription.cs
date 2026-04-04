namespace HMSApi.Models;


public class Prescription
{
    public int Id { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;
    public string DoctorName  { get; set; }=null!;
    public string Notes { get; set; } = null!;

    public int CustomerId { get; set; }
    public Customer? Customer { get; set; } 
}