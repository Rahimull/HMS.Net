using HMSApi.Modules.User.DTOs;
using HMSApi.Modules.User.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using HMSApi.Modules.User.Entities;

namespace HMSApi.Modules.User.Controllers;

[ApiController]
[Route("api/users")]
[Authorize(Roles = "Admin")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole<int>> _roleManager;

    public UserController(
        IUserService service,
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole<int>> roleManager)
    {
        _service = service;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    // ================= GET ALL =================
    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] UserQueryParams query)
        => Ok(await _service.GetUsersAsync(query));

    // ================= GET BY ID =================
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
        => Ok(await _service.GetByIdAsync(id));

    // ================= CREATE =================
    [HttpPost]
    public async Task<IActionResult> Create(CreateUserDto dto)
    {
        await _service.CreateUserAsync(dto);
        return Ok("User created successfully");
    }

    // ================= UPDATE =================
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateUserDto dto)
    {
        await _service.UpdateUserAsync(id, dto);
        return Ok("User updated successfully");
    }

    // ================= DELETE =================
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteUserAsync(id);
        return Ok("User deleted successfully");
    }

    // ================= CHANGE STATUS =================
    [HttpPut("{id}/status")]
    public async Task<IActionResult> ChangeStatus(int id, bool isActive)
    {
        var result = await _service.ChangeStatusAsync(id, isActive);
        return Ok(result);
    }

    // ================= GET USER ROLES =================
    [HttpGet("{id}/roles")]
    public async Task<IActionResult> GetUserRoles(int id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null) return NotFound("User not found");

        var roles = await _userManager.GetRolesAsync(user);

        return Ok(roles);
    }

    // ================= ASSIGN ROLES =================
    [HttpPost("{id}/roles")]
    public async Task<IActionResult> AssignRoles(int id, [FromBody] AssignRoleDto dto)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null) return NotFound("User not found");

        var currentRoles = await _userManager.GetRolesAsync(user);

        await _userManager.RemoveFromRolesAsync(user, currentRoles);

        var roles = _roleManager.Roles
            .Where(r => dto.RoleIds.Contains(r.Id))
            .Select(r => r.Name!)
            .ToList();

        var result = await _userManager.AddToRolesAsync(user, roles);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Roles updated successfully");
    }
}