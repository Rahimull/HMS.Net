namespace HMSApi.Models;


public class User
{
    public int Id { get; set; }
    public string Name { get; set; }=null!;
    public string Email { get; set; }=null!;
    public string PasswordHash { get; set; }=null!;
    public string Role  { get; set; }=null!;
    public DateTime CreatedAt { get; set; }=DateTime.Now;
    public DateTime UpdatedAt { get; set; }

    public ICollection<Sale>? Sales { get; set; }
    public ICollection<Purchase>? Purchases { get; set; }
    public ICollection<FinanceTransaction>? FinanceTransactions { get; set; }
}