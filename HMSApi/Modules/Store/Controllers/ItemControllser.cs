using System.Reflection.Emit;
using HMSApi.Common.Enums;
using HMSApi.Controllers;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Store.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ItemController : BaseController<IItemService, ItemDto, CreateItemDto, UpdateItemDto>
{
    public ItemController(IItemService service) : base(service)
    {

    }

    [HttpGet("{name}")]
    public IActionResult GetEnum(string name)
    {
        var type = Type.GetType($"HMSApi.Common.Enums.{name}");

        if (type == null)
            return BadRequest("Enum not found");

        var result = Enum.GetValues(type)
            .Cast<Enum>()
            .Select(x => new
            {
                value = Convert.ToInt32(x),
                label = x.ToString()
            });

        return Ok(result);
    }
}