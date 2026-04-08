

public interface IBaseService<TDto, TCreateDto, TUpdateDto>
{
    Task<List<TDto>> GetAllAsync();
    Task<TDto?> GetByIdAsync(int id);
    Task<TDto> AddAsync(TCreateDto dto);
    Task UpdateAsync(int id, TUpdateDto dto);
    Task SoftDeleteAsync(int id);
    Task<bool> ExistsAsync(int id);

}