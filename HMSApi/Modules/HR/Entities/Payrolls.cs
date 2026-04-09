using HMSApi.Models;

namespace HMSApi.Modules.HR.Entities;


public class Payrolls : BaseEntity
{
    public DateTime PayrollDate { get; set; }
    public decimal BaseSalary { get; set; }
    public decimal Allowances { get; set; }
    public decimal Deductions { get; set; }
    public decimal NetSalary { get; set; }
    public string? Notes { get; set; }


    // foreign keys
    public int EmployeeId { get; set; }

    // Navigation Property
    public Employees Employees { get; set; } = null!;
}