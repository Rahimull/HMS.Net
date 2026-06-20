using HMSApi.Data;
using HMSApi.Modules.User.DTOs;
using HMSApi.Modules.User.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.User.Controllers;

[ApiController]
[Route("api/permissions")]
[Authorize(Roles = "Admin")]
public class PermissionsController : ControllerBase
{
    private readonly HMSDBC _context;

    public PermissionsController(HMSDBC context)
    {
        _context = context;
    }

    // ================= GET ALL =================
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var permissions = await _context.Permissions
            .Select(p => new
            {
                p.Id,
                p.Name,
                p.Description
            })
            .ToListAsync();

        return Ok(permissions);
    }
    [HttpPost("{id}/permissions")]
public async Task<IActionResult> AssignPermissions(
    int id,
    [FromBody] AssignPermissionsDto dto)
{
    if (id != dto.RoleId)
        return BadRequest("Role mismatch");

    var existing = _context.RolePermissions
        .Where(x => x.RoleId == id);

    _context.RolePermissions.RemoveRange(existing);

    var newItems = dto.PermissionIds.Select(pid => new RolePermission
    {
        RoleId = id,
        PermissionId = pid
    });

    await _context.RolePermissions.AddRangeAsync(newItems);
    await _context.SaveChangesAsync();

    return Ok("Permissions updated successfully");
}

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