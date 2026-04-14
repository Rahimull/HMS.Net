using HMSApi.Controllers;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Reception.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AppointmentController : BaseController<IAppointmentService, AppointmentDto, CreateAppointmentDto, UpdateAppointmentDto>
{
    public AppointmentController(IAppointmentService service) : base(service)
    {

    }
}