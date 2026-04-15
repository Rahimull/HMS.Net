using HMSApi.Controllers;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Pharmacy.Controllers;


[ApiController]
[Route("api/[controller]")]
public class MedicineController : BaseController<IMedicineService, MedicineDto, CreateMedicineDto, UpdateMedicineDto>
{
    public MedicineController(IMedicineService service) : base(service)
    {

    }
}