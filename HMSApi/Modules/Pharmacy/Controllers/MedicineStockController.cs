using HMSApi.Controllers;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Pharmacy.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicineStockController
    : BaseController<
        IMedicineStockService,
        MedicineStockDto,
        CreateMedicineStockDto,
        UpdateMedicineStockDto>
{
    public MedicineStockController(IMedicineStockService service)
        : base(service)
    {
    }
}