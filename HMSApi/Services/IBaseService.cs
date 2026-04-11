

using HMSApi.Models;
namespace HMSApi.Services;
public interface IBaseService<TDto, TCreateDto, TUpdateDto>
{
    Task<TDto?> GetByIdAsync(int id);
    Task<TDto> AddAsync(TCreateDto dto);
    Task UpdateAsync(int id, TUpdateDto dto);
    Task SoftDeleteAsync(int id);
    Task<bool> ExistsAsync(int id);

    Task<PagedResult<TDto>> GetPagedAsync(QueryParams queryParams);


}