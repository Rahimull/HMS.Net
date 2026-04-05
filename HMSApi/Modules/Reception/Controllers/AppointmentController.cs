using HMSApi.Controllers;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Mudoles.Reception.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AppointmentController: BaseController<IAppointmentService, AppointmentDto, CreateAppointmentDto, UpdateAppointmentDto>
{
    public AppointmentController(IAppointmentService service) : base(service)
    {
        
    }
}