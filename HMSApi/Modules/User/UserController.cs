using HMSApi.Modules.User.DTOs;
using HMSApi.Modules.User.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.User.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;

    public UserController(IUserService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] UserQueryParams query)
        => Ok(await _service.GetUsersAsync(query));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
        => Ok(await _service.GetByIdAsync(id));

    [HttpPost]
    public async Task<IActionResult> Create(CreateUserDto dto)
    {
        await _service.CreateUserAsync(dto);
        return Ok("User created successfully");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateUserDto dto)
    {
        await _service.UpdateUserAsync(id, dto);
        return Ok("User updated successfully");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteUserAsync(id);
        return Ok("User deleted successfully");
    }

    [HttpPut("{id}/roles")]
    public async Task<IActionResult> AssignRoles(int id, List<string> roles)
    {
        await _service.AssignRolesAsync(id, roles);
        return Ok("Roles updated");
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> ChangeStatus(int id, bool isActive)
    {
        var result = await _service.ChangeStatusAsync(id, isActive);
        return Ok(result);
    }
}