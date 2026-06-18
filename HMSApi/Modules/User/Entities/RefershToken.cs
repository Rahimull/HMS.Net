namespace HMSApi.Modules.User.Entities;
public class RefreshToken
{
    public int Id { get; set; }

    public string Token { get; set; } = null!;
    public DateTime ExpiryDate { get; set; }
    public bool IsRevoked { get; set; }

    public string? CreatedByIp { get; set; }
    public string? RevokedByIp { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
}