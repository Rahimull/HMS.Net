using AutoMapper;
using HMSApi.Models;

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

    public async Task AddAsync(TCreateDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);
        await _repo.AddAsync(entity);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _repo.ExistsAsync(id);
    }

    public async Task<List<TDto>> GetAllAsync()
    {
        var entities = await _repo.GetAllAsync();
        return _mapper.Map<List<TDto>>(entities);
    }

    public async Task<TDto?> GetByIdAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) return default;
        return _mapper.Map<TDto>(entity);
    }

    public async Task SoftDeleteAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) throw new Exception("Entity not found");
        await _repo.SoftDeleteAsync(entity);
    }

    public async Task UpdateAsync(int id, TUpdateDto dto)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) throw new Exception("Entity not Found");

        _mapper.Map(dto, entity);
        await _repo.UpdateAsync(entity);
    }
}