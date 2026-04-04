


using HMSApi.Models;

public interface IBaseRepository<TEntity> where TEntity : BaseEntity
{
    Task<List<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(int id);
    Task AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task SoftDeleteAsync(TEntity entity);
    Task<bool> ExistsAsync(int id);
}