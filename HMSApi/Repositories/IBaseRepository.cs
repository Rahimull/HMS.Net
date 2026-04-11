


using HMSApi.Models;
namespace HMSApi.Repositories;
public interface IBaseRepository<TEntity> where TEntity : BaseEntity
{
    // CRUD
    // Task<List<TEntity>> GetAllAsync();
   
    Task<TEntity?> GetByIdAsync(int id);
    Task AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task SoftDeleteAsync(TEntity entity);
    Task<bool> ExistsAsync(int id);

     // Simple Query (DEPRECATED but optional)
    Task<List<TEntity>> GetAllAsync();

    // Advanced Query Support
    IQueryable<TEntity> Query();

    // Specifiation Support
    Task<List<TEntity>> ListAsync(ISpecification<TEntity> spec);
    Task<int> CountAsync(ISpecification<TEntity> spec);
}