using HMSApi.Data;
using HMSApi.Modules.User.DTOs;
using HMSApi.Modules.User.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.User.Controllers;

[ApiController]
[Route("api/roles")]
[Authorize(Roles = "Admin")]
public class RolesController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole<int>> _roleManager;
    private readonly HMSDBC _context;

    public RolesController(
        RoleManager<IdentityRole<int>> roleManager,
        UserManager<AppUser> userManager,
        HMSDBC context)
    {
        _roleManager = roleManager;
        _userManager = userManager;
        _context = context;
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
                Name = r.Name ?? "",
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
            Name = role.Name ?? "",
            UserCount = users.Count
        });
    }

    // ================= CREATE =================
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateRoleDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (await _roleManager.RoleExistsAsync(dto.Name))
            return BadRequest("Role already exists");

        var result = await _roleManager.CreateAsync(
            new IdentityRole<int> { Name = dto.Name });

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Role created successfully");
    }

    // ================= UPDATE =================
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateRoleDto dto)
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
            return BadRequest("Cannot delete role because users are assigned");

        var result = await _roleManager.DeleteAsync(role);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Role deleted successfully");
    }

    // ================= ASSIGN ROLE TO USER =================
    [HttpPost("assign")]
    public async Task<IActionResult> AssignRoles([FromBody] AssignRoleDto dto)
    {
        var user = await _userManager.FindByIdAsync(dto.UserId.ToString());

        if (user == null)
            return NotFound("User not found");

        // remove all current roles
        var currentRoles = await _userManager.GetRolesAsync(user);
        await _userManager.RemoveFromRolesAsync(user, currentRoles);

        // get role names from ids
        var roles = _roleManager.Roles
            .Where(r => dto.RoleIds.Contains(r.Id))
            .Select(r => r.Name!)
            .ToList();

        // assign new roles
        await _userManager.AddToRolesAsync(user, roles);

        return Ok("Roles updated successfully");
    }
    // ================= ASSIGN PERMISSIONS TO ROLE =================
    [HttpPost("{id}/permissions")]
    public async Task<IActionResult> AssignPermissions(int id, [FromBody] AssignPermissionsDto dto)
    {
        if (id != dto.RoleId)
            return BadRequest("Role mismatch");

        var oldPermissions = _context.RolePermissions
            .Where(x => x.RoleId == id);

        _context.RolePermissions.RemoveRange(oldPermissions);

        var newPermissions = dto.PermissionIds.Select(pid => new RolePermission
        {
            RoleId = id,
            PermissionId = pid
        });

        await _context.RolePermissions.AddRangeAsync(newPermissions);
        await _context.SaveChangesAsync();

        return Ok("Permissions updated successfully");
    }

    // ================= GET ROLE PERMISSIONS =================
    [HttpGet("{id}/permissions")]
    public async Task<IActionResult> GetRolePermissions(int id)
    {
        var permissions = await _context.RolePermissions
            .Where(x => x.RoleId == id)
            .Select(x => x.PermissionId)
            .ToListAsync();

        return Ok(permissions);
    }
}