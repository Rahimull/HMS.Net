using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.HR.Entities;


public class Employees : BaseEntity
{
    public string Name { get; set; } = null!;
    public string EmployeeNumber { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public DateOnly HireDate { get; set; }
    public EmployeeStatus Status { get; set; }

    // Foriegn Keys
    public int DepartmentId { get; set; }

    // Navigations Property
    public Department Department { get; set; } = null!;


}