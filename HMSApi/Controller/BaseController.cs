using HMSApi.ApiResponse;
using HMSApi.Models;
using HMSApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController<TService, TDto, TCreateDto, TUpdateDto> : ControllerBase
where TService : IBaseService<TDto, TCreateDto, TUpdateDto>
where TDto : class
where TCreateDto : class
where TUpdateDto : class
{
    protected readonly TService _service;

    protected BaseController(TService service)
    {
        _service = service;
    }

    // 🔥 PAGED LIST (MAIN ENDPOINT)
    [HttpPost("paged")]
    public virtual async Task<IActionResult> GetPaged([FromBody] QueryParams query)
    {
        var result = await _service.GetPagedAsync(query);

        return Ok(new ApiResponse<PagedResult<TDto>>
        {
            Success = true,
            Message = $"{typeof(TDto).Name} fetched successfully",
            Data = result
        });
    }

    // GET BY ID
    [HttpGet("{id:int}")]
    public virtual async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null)
        {
            return NotFound(new ApiResponse<string>
            {
                Success = false,
                Message = "Not found"
            });
        }

        return Ok(new ApiResponse<TDto>
        {
            Success = true,
            Message = "Fetched successfully",
            Data = result
        });
    }

    // CREATE

    [HttpPost]
    public virtual async Task<IActionResult> Create([FromBody] TCreateDto dto)
    {
        var result = await _service.AddAsync(dto);

        return Ok(new ApiResponse<TDto>
        {
            Success = true,
            Message = "Created successfully",
            Data = result
        });
    }


    // UPDATE
    [HttpPut("{id:int}")]
    public virtual async Task<IActionResult> Update(int id, [FromBody] TUpdateDto dto)
    {
        await _service.UpdateAsync(id, dto);

        return Ok(new ApiResponse<string>
        {
            Success = true,
            Message = "Updated successfully"
        });
    }

    // DELETE (SOFT)
    [HttpDelete("{id:int}")]
    public virtual async Task<IActionResult> Delete(int id)
    {
        await _service.SoftDeleteAsync(id);

        return Ok(new ApiResponse<string>
        {
            Success = true,
            Message = "Deleted successfully"
        });
    }
}