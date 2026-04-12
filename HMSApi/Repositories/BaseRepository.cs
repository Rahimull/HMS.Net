using System.Linq.Expressions;
using HMSApi.Data;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;
namespace HMSApi.Repositories;

public class BaseRepository<TEntity> : IBaseRepository<TEntity>
    where TEntity : BaseEntity
{
    protected readonly HMSDBC _context;
    protected readonly DbSet<TEntity> _dbSet;

    public BaseRepository(HMSDBC context)
    {
        _context = context;
        _dbSet = context.Set<TEntity>();
    }

    // 🔥 QUERY (core)
    public IQueryable<TEntity> Query()
    {
        return _dbSet.AsNoTracking();
    }

    public IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> predicate)
    {
        return _dbSet.Where(predicate).AsNoTracking();
    }

    // 🔥 SPECIFICATION
    public async Task<List<TEntity>> ListAsync(ISpecification<TEntity> spec)
    {
        var query = SpecificationEvaluator.GetQuery(_dbSet, spec);
        return await query.ToListAsync();
    }

    public async Task<int> CountAsync(Expression<Func<TEntity, bool>>? criteria)
    {
        // var query = SpecificationEvaluator.GetQuery(_dbSet, spec);
        // return await query.CountAsync();
        var query  = _dbSet.AsNoTracking();
        if (criteria !=null)
            query = query.Where(criteria);
        return await query.CountAsync();
    }

    // CRUD
    public async Task AddAsync(TEntity entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TEntity entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task SoftDeleteAsync(TEntity entity)
    {
        entity.IsDeleted = true;
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _dbSet.AnyAsync(x => x.Id == id);
    }

    public async Task<TEntity?> GetByIdAsync(int id)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
    }

    // ⚠️ optional (can be removed)
    public async Task<List<TEntity>> GetAllAsync()
    {
        return await _dbSet.AsNoTracking().ToListAsync();
    }
}