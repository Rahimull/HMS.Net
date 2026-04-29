using HMSApi.Models;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Pharmacy.Controllers;

[ApiController]
[Route("api/pharmacy/sales")]
public class SaleController : ControllerBase
{
    private readonly ISaleService _service;

    public SaleController(ISaleService service)
    {
        _service = service;
    }

    // =========================
    // CREATE SALE (POS)
    // =========================
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSaleDto dto)
    {
        var result = await _service.AddAsync(dto);

        return Ok(new
        {
            success = true,
            message = "Sale created successfully",
            data = result
        });
    }

    // =========================
    // GET ALL SALES (PAGED)
    // =========================
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] QueryParams query)
    {
        query ??= new QueryParams();

        var result = await _service.GetPagedAsync(query);

        return Ok(new
        {
            success = true,
            data = result
        });
    }

    // =========================
    // GET BY ID
    // =========================
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);

        return Ok(new
        {
            success = true,
            data = result
        });
    }

    // =========================
    // SOFT DELETE
    // =========================
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.SoftDeleteAsync(id);

        return Ok(new
        {
            success = true,
            message = "Sale deleted successfully"
        });
    }
}