using HMSApi.Controllers;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Pharmacy.Controllers;


[ApiController]
[Route("api/[controller]")]
public class SaleController: BaseController<ISaleService, SaleDto, CreateSaleDto, UpdateSaleDto>
{
    public SaleController(ISaleService service) : base(service)
    {
        
    }
}