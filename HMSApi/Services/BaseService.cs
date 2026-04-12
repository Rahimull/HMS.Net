using AutoMapper;
using HMSApi.Models;
using HMSApi.Repositories;
namespace HMSApi.Services;

using AutoMapper;


public abstract class BaseService<TEntity, TDto, TCreateDto, TUpdateDto>
    : IBaseService<TDto, TCreateDto, TUpdateDto>
    where TEntity : BaseEntity
{
    protected readonly IBaseRepository<TEntity> _repo;
    protected readonly IMapper _mapper;

    protected BaseService(IBaseRepository<TEntity> repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public virtual async Task<TDto> AddAsync(TCreateDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);
        await _repo.AddAsync(entity);
        return _mapper.Map<TDto>(entity);
    }

    public virtual async Task UpdateAsync(int id, TUpdateDto dto)
    {
        var entity = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException();

        _mapper.Map(dto, entity);
        await _repo.UpdateAsync(entity);
    }

    public virtual async Task SoftDeleteAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException();

        await _repo.SoftDeleteAsync(entity);
    }

    public async Task<TDto?> GetByIdAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        return entity == null ? default(TDto) : _mapper.Map<TDto>(entity);
    }

    public async Task<bool> ExistsAsync(int id)
        => await _repo.ExistsAsync(id);

    public async Task<PagedResult<TDto>> GetPagedAsync(QueryParams query)
    {
        var spec = BuildSpecification(query);

        var data  = await _repo.ListAsync(spec);
        var count = await _repo.CountAsync(spec.Criteria);

        return new PagedResult<TDto>
        {
            PageIndex = query.Pagination.PageIndex,
            PageSize  = query.Pagination.PageSize,
            TotalCount = count,
            Data = _mapper.Map<List<TDto>>(data)
        };
    }

    // ✅ فقط همین یک نقطه Extension
    protected abstract ISpecification<TEntity> BuildSpecification(QueryParams query);
}