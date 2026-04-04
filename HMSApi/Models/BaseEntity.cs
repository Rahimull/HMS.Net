namespace HMSApi.Models;

public abstract class BaseEntity
{
     // Primary Key
    public int Id { get; set; } = default;

    // Automatically set on inserف
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    //  Soft Delete Flag
    public bool IsDeleted { get; set; }
}