using AutoMapper;
using HMSApi.Modules.User.DTOs;
using HMSApi.Modules.User.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.User.Services;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole<int>> _roleManager;
    private readonly IMapper _mapper;

    public UserService(
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole<int>> roleManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _mapper = mapper;
    }

    // =========================
    // GET USERS
    // =========================
    public async Task<List<UserListDto>> GetUsersAsync(UserQueryParams query)
    {
        var usersQuery = _userManager.Users
            .Include(u => u.Department)
            .AsQueryable();

        if (query.IsActive.HasValue)
            usersQuery = usersQuery.Where(u => u.IsActive == query.IsActive);

        if (query.DepartmentId.HasValue)
            usersQuery = usersQuery.Where(u => u.DepartmentId == query.DepartmentId);

        if (!string.IsNullOrWhiteSpace(query.Search?.SearchTerm))
        {
            var term = query.Search.SearchTerm.ToLower();
            usersQuery = usersQuery.Where(u =>
                u.FullName.ToLower().Contains(term) ||
                (u.UserName != null && u.UserName.ToLower().Contains(term)));
        }

        var users = await usersQuery.ToListAsync();

        var result = _mapper.Map<List<UserListDto>>(users);

        // Roles attach (manual because Identity)
        foreach (var user in users)
        {
            var dto = result.First(x => x.Id == user.Id);
            dto.Roles = (await _userManager.GetRolesAsync(user)).ToList();
        }

        return result;
    }

    // =========================
    // GET BY ID
    // =========================
    public async Task<DetailsUserDto?> GetByIdAsync(int id)
    {
        var user = await _userManager.Users
            .Include(u => u.Department)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (user == null) return null;

        var dto = _mapper.Map<DetailsUserDto>(user);
        dto.Roles = (await _userManager.GetRolesAsync(user)).ToList();

        return dto;
    }

    // =========================
    // CREATE USER
    // =========================
    public async Task CreateUserAsync(CreateUserDto dto)
    {
        var user = _mapper.Map<AppUser>(dto);

        user.UserName = dto.UserName;
        user.Email = dto.Email;

        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
            throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));

        if (dto.Roles.Any())
            await _userManager.AddToRolesAsync(user, dto.Roles);
    }

    // =========================
    // UPDATE USER
    // =========================
    public async Task UpdateUserAsync(int id, UpdateUserDto dto)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null) return;

        _mapper.Map(dto, user);

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
            throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
    }

    // =========================
    // DELETE USER
    // =========================
    public async Task DeleteUserAsync(int id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null) return;

        await _userManager.DeleteAsync(user);
    }

    // =========================
    // ASSIGN ROLES
    // =========================
    public async Task AssignRolesAsync(int userId, List<string> roles)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user == null) return;

        var currentRoles = await _userManager.GetRolesAsync(user);
        await _userManager.RemoveFromRolesAsync(user, currentRoles);

        await _userManager.AddToRolesAsync(user, roles);
    }

    // =========================
    // CHANGE STATUS
    // =========================
    public async Task<bool> ChangeStatusAsync(int userId, bool isActive)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user == null) return false;

        user.IsActive = isActive;

        var result = await _userManager.UpdateAsync(user);

        return result.Succeeded;
    }
}