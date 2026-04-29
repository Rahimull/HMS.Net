using HMSApi.Controllers;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Pharmacy.Controllers;


[ApiController]
[Route("api/[controller]")]
public class SaleDetailsController: BaseController<ISaleDetailsService, SaleDetailsDto, CreateSaleDetailsDto, UpdateSaleDetailsDto>
{
    public SaleDetailsController(ISaleDetailsService service) : base(service)
    {
        
    }
}