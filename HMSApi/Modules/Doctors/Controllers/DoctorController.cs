using HMSApi.Controllers;
using HMSApi.Modules.Doctors.Services;
using HMSApi.Modules.Doctors.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Doctors.Controllers;


[ApiController]
[Route("api/[controller]")]
public class DoctorController: BaseController<IDoctorService, DoctorDto, CreateDoctorDto, UpdateDoctorDto>
{
    public DoctorController(IDoctorService service) : base(service)
    {
        
    }
}