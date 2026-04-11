using AutoMapper;
using HMSApi.Models;
using HMSApi.Repositories;
namespace HMSApi.Services;
public class BaseService<TEntity, TDto, TCreateDto, TUpdateDto>
    : IBaseService<TDto, TCreateDto, TUpdateDto>
    where TEntity : BaseEntity
{
    protected readonly IBaseRepository<TEntity> _repo;
    protected readonly IMapper _mapper;

    public BaseService(IBaseRepository<TEntity> repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    // CREATE
    public virtual async Task<TDto> AddAsync(TCreateDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);
        await _repo.AddAsync(entity);
        return _mapper.Map<TDto>(entity);
    }

    // EXISTS
    public async Task<bool> ExistsAsync(int id)
    {
        return await _repo.ExistsAsync(id);
    }

    // GET BY ID
    public async Task<TDto?> GetByIdAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        return entity == null ? default : _mapper.Map<TDto>(entity);
    }

    // UPDATE
    public async Task UpdateAsync(int id, TUpdateDto dto)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null)
            throw new KeyNotFoundException("Entity not found");

        _mapper.Map(dto, entity);
        await _repo.UpdateAsync(entity);
    }

    // DELETE
    public async Task SoftDeleteAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null)
            throw new KeyNotFoundException("Entity not found");

        await _repo.SoftDeleteAsync(entity);
    }

    // 🔥 ONLY ONE SOURCE OF TRUTH
    public async Task<PagedResult<TDto>> GetPagedAsync(QueryParams query)
    {
        var spec = BuildSpecification(query);

        var data = await _repo.ListAsync(spec);
        var count = await _repo.CountAsync(spec);

        return new PagedResult<TDto>
        {
            PageIndex = query.Pagination.PageIndex,
            PageSize = query.Pagination.PageSize,
            TotalCount = count,
            Data = _mapper.Map<List<TDto>>(data)
        };
    }

    // 🔥 SPEC OVERRIDE POINT
    protected virtual ISpecification<TEntity> BuildSpecification(QueryParams query)
    {
        return new BaseSpecification<TEntity>();
    }

}