using HMSApi.Modules.User.DTOs;
using HMSApi.Modules.User.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.User.Controllers;

[ApiController]
[Route("api/roles")]
[Authorize(Roles = "Admin")]
public class RolesController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole<int>> _roleManager;

    public RolesController(RoleManager<IdentityRole<int>> roleManager, UserManager<AppUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    [HttpGet]
    public IActionResult GetRoles()
    {
        var roles = _roleManager.Roles
            .Select(r => new RoleDto
            {
                Id = r.Id,
                Name = r.Name!
            });

        return Ok(roles);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateRoleDto dto)
    {
        if (await _roleManager.RoleExistsAsync(dto.Name))
            return BadRequest("Role already exists");

        var result = await _roleManager.CreateAsync(
            new IdentityRole<int>
            {
                Name = dto.Name
            });

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Role created successfully");
    }

    [HttpPost("assign")]
    public async Task<IActionResult> AssignRole(AssignRoleDto dto)
    {
        var user = await _userManager.FindByIdAsync(dto.UserId.ToString());

        if (user == null)
            return NotFound("User not found");

        var result = await _userManager.AddToRoleAsync(
            user,
            dto.RoleName);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Role assigned");
    }
}