using HMSApi.Modules.User.DTOs;

namespace HMSApi.Modules.User.Services;

public interface IUserService
{
    Task<List<UserListDto>> GetUsersAsync(UserQueryParams query);
    Task<DetailsUserDto?> GetByIdAsync(int id);

    Task CreateUserAsync(CreateUserDto dto);
    Task UpdateUserAsync(int id, UpdateUserDto dto);

    Task DeleteUserAsync(int id);

    Task AssignRolesAsync(int userId, List<string> roles);
    Task<bool> ChangeStatusAsync(int userId, bool isActive);
}