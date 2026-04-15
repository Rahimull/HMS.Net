using HMSApi.Controllers;
using HMSApi.Modules.Finance.DTOs;
using HMSApi.Modules.Finance.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Finance.Controllers;


[ApiController]
[Route("api/[controller]")]
public class InvoiceDetailsController : BaseController<IInvoiceDetailsService, InvoiceDetailsDto, CreateInvoiceDetailsDto, UpdateInvoiceDetailsDto>
{
    public InvoiceDetailsController(IInvoiceDetailsService service) : base(service)
    {

    }
}