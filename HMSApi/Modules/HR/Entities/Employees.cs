using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Reception.Entities;

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

    public ICollection<Shifts> Shifts { get; set; } = new List<Shifts>();
    public ICollection<Payrolls> Payrolls { get; set; } = new List<Payrolls>();
    public ICollection<Reports> Reports { get; set; } = new List<Reports>();


}