using HMSApi.Controllers;
using HMSApi.Modules.Finance.DTOs;
using HMSApi.Modules.Finance.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Finance.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController
    : BaseController<
        IPaymentService,
        PaymentDto,
        CreatePaymentDto,
        UpdatePaymentDto>
{
    public PaymentController(IPaymentService service)
        : base(service)
    {
    }
}