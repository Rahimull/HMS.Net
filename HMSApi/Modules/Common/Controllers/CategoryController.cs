using HMSApi.Controllers;
using HMSApi.Modules.Common.DTOs;
using HMSApi.Modules.Common.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Common.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CategoryController : BaseController<ICategoryService, CategoryDto, CreateCategoryDto, UpdateCategoryDto>
{
    public CategoryController(ICategoryService service) : base(service)
    {

    }
}