using HMSApi.Controllers;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Pharmacy.Controllers;


[ApiController]
[Route("api/[controller]")]
public class SalePaymentController: BaseController<ISalePaymentService, SalePaymentDto, CreateSalePaymentDto, UpdateSalePaymentDto>
{
    public SalePaymentController(ISalePaymentService service) : base(service)
    {
        
    }
}