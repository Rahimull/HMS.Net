using HMSApi.Controllers;
using HMSApi.Modules.Finance.DTOs;
using HMSApi.Modules.Finance.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Finance.Controllers;


[ApiController]
[Route("api/[controller]")]
public class InvoiceController: BaseController<IInvoiceService, InvoiceDto, CreateInvoiceDto, UpdateInvoiceDto>
{
    public InvoiceController(IInvoiceService service) : base(service)
    {
        
    }
}