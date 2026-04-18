using HMSApi.Controllers;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Store.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PurchaseDetailsController
    : BaseController<
        IPurchaseDetailsService,
        PurchaseDetailsDto,
        CreatePurchaseDetailsDto,
        UpdatePurchaseDetailsDto>
{
    public PurchaseDetailsController(IPurchaseDetailsService service)
        : base(service)
    {
    }
}