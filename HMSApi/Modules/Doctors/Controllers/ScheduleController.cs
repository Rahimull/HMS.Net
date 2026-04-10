using HMSApi.Controllers;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Doctors.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ScheduleController: BaseController<IScheduleService, ScheduleDto, CreateScheduleDto, UpdateScheduleDto>
{
    public ScheduleController(IScheduleService service) : base(service)
    {
        
    }
}