using HMSApi.Controllers;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Store.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CurrentStockController: BaseController<ICurrentStockService, CurrentStockDto, CreateCurrentStockDto, UpdateCurrentStockDto>
{
    public CurrentStockController(ICurrentStockService service) : base(service)
    {
        
    }
}