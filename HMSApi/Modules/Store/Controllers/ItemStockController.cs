using HMSApi.Controllers;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Store.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ItemStockController: BaseController<IItemStockService, ItemStockDto, CreateItemStockDto, UpdateItemStockDto>
{
    public ItemStockController(IItemStockService service) : base(service)
    {
        
    }
}