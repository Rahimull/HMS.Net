using HMSApi.Controllers;
using HMSApi.Data;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Modules.Store.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace HMSApi.Modules.Store.Controllers;


[ApiController]
[Route("api/[controller]")]
public class StockMovementController: BaseController<IStockMovementService, StockMovementDto, CreateStockMovementDto, UpdateStockMovementDto>
{
    private readonly HMSDBC _context;
    public StockMovementController(IStockMovementService service, HMSDBC context) : base(service)
    {
        _context = context;
    }


    [HttpGet("kpi")]
    public async Task<ActionResult> GetKpiAsync()
    {
       var totalIn = await _context.StockMovement.Where(x => x.Quantity > 0)
       .CountAsync();

       var totalOut = await _context.StockMovement.Where(x => x.Quantity <  0 )
       .CountAsync();     
         return Ok(new {
          TotalIn = totalIn,
          TotalOut = totalOut,
          NetMovement = totalIn + totalOut
         });
    }
}