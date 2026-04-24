using HMSApi.Controllers;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Store.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PurchasesController
    : BaseController<
        IPurchaseService,
        PurchasesDto,
        CreatePurchaseDto,
        UpdatePurchasesDto>
{
    public PurchasesController(IPurchaseService service)
        : base(service)
    {
    }
}