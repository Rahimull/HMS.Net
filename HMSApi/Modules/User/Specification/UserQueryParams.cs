using HMSApi.Models;

public class UserQueryParams : QueryParams
{
    public int? DepartmentId { get; set; }

    public bool? IsActive { get; set; }

    public string? Role { get; set; }
}