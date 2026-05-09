using HMSApi.Controllers;
using HMSApi.Data;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Store.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ItemStockController : BaseController<IItemStockService, ItemStockDto, CreateItemStockDto, UpdateItemStockDto>
{
    private readonly HMSDBC _context;
    public ItemStockController(IItemStockService service, HMSDBC context) : base(service)
    {
        _context = context;
    }

    [HttpGet("kpi")]
    public async Task<ActionResult> GetKpiAsync()
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var totalBatches = await _context.ItemStocks.CountAsync();
        var expiredBatches = await _context.ItemStocks.Where(x => x.ExpiryDate.HasValue && x.ExpiryDate.Value < today).CountAsync();
        var lowStockBatches = await _context.ItemStocks.Where(x => x.RemainingQuantity < 10).CountAsync();
        var nearExpiryBatches = await _context.ItemStocks.Where(x => x.ExpiryDate.HasValue && x.ExpiryDate.Value >= today && x.ExpiryDate.Value <= today.AddDays(30)).CountAsync();


        return Ok(new
        {
            TotalBatches = totalBatches,
            ExpiredBatches = expiredBatches,
            LowStockBatches = lowStockBatches,
            NearExpiryBatches = nearExpiryBatches,
            ExpiryRate = totalBatches > 0 ? (double)expiredBatches / totalBatches * 100 : 0
        });
    }

}