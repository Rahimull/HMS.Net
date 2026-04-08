

using HMSApi.ApiResponse;
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

    [HttpGet]
    public virtual async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        // return Ok(result);
        
        return Ok(new ApiResponse<IEnumerable<TDto>>
        {
            Success = true,
            Message = $"{typeof(TDto).Name} fetched successfully",
            Data = result
        });
    }

    [HttpGet("{id:int}")]
    public virtual async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null) return NotFound();
        // return Ok(result);

        return Ok(new ApiResponse<TDto>
        {
            Success = true,
            Message = $"{typeof(TDto).Name} fetched successfully",
            Data = result
        });
    }

    [HttpPost]
    public virtual async Task<IActionResult> Create([FromBody] TCreateDto dto)
    {

        var result = await _service.AddAsync(dto);
        // return CreatedAtAction(nameof(GetAll), null);

        return Ok(new ApiResponse<TDto>
        {
            Success = true,
            Message = $"{typeof(TDto).Name} Create successfulldy",
            Data = result
        });

    }

    [HttpPut("{id:int}")]
    public virtual async Task<IActionResult> Update(int id, [FromBody] TUpdateDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return NoContent();

    }

    [HttpDelete("{id:int}")]
    public virtual async Task<IActionResult> SoftDelete(int id)
    {
        await _service.SoftDeleteAsync(id);
        return NoContent();

    }

    [HttpGet("{id:int}/exists")]
    public virtual async Task<IActionResult> Exists(int id)
    {
        var exists = await _service.ExistsAsync(id);
        return Ok(exists);

    }



}