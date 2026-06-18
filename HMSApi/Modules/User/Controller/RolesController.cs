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

    public RolesController(
        RoleManager<IdentityRole<int>> roleManager,
        UserManager<AppUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    // ================= GET ALL =================

    [HttpGet]
    public IActionResult GetRoles()
    {
        var roles = _roleManager.Roles
            .ToList()
            .Select(r => new RoleDto
            {
                Id = r.Id,
                Name = r.Name!,
                UserCount = _userManager
                    .GetUsersInRoleAsync(r.Name!)
                    .Result
                    .Count
            });

        return Ok(roles);
    }

    // ================= GET BY ID =================

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var role = await _roleManager.FindByIdAsync(id.ToString());

        if (role == null)
            return NotFound();

        var users = await _userManager.GetUsersInRoleAsync(role.Name!);

        return Ok(new RoleDto
        {
            Id = role.Id,
            Name = role.Name!,
            UserCount = users.Count
        });
    }

    // ================= CREATE =================

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateRoleDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

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

    // ================= UPDATE =================

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] UpdateRoleDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var role = await _roleManager.FindByIdAsync(id.ToString());

        if (role == null)
            return NotFound();

        var existingRole = await _roleManager.FindByNameAsync(dto.Name);

        if (existingRole != null && existingRole.Id != id)
            return BadRequest("Role name already exists");

        role.Name = dto.Name;

        var result = await _roleManager.UpdateAsync(role);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Role updated successfully");
    }

    // ================= DELETE =================

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var role = await _roleManager.FindByIdAsync(id.ToString());

        if (role == null)
            return NotFound();

        var users = await _userManager.GetUsersInRoleAsync(role.Name!);

        if (users.Any())
            return BadRequest(
                "Cannot delete role because users are assigned to it.");

        var result = await _roleManager.DeleteAsync(role);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Role deleted successfully");
    }

    // ================= ASSIGN ROLE =================

    [HttpPost("assign")]
    public async Task<IActionResult> AssignRole(
        [FromBody] AssignRoleDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager
            .FindByIdAsync(dto.UserId.ToString());

        if (user == null)
            return NotFound("User not found");

        if (!await _roleManager.RoleExistsAsync(dto.RoleName))
            return NotFound("Role not found");

        if (await _userManager.IsInRoleAsync(user, dto.RoleName))
            return BadRequest(
                "User already has this role");

        var result = await _userManager
            .AddToRoleAsync(user, dto.RoleName);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Role assigned successfully");
    }
}