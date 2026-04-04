namespace HMSApi.Models;

public class BaseEntity<TKey>
{
    // Id is Premary key for every childe class
    public int Id { get; set; } = default;

    // Created at is also automathicly added for every childe class
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Is Deleted is soft delet for every childe class
    public bool IsDeleted { get; set; }
}