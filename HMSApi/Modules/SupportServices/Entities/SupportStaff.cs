using HMSApi.Models;
using HMSApi.Modules.HR.Entities;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.SupportServices.Entities;


public class SupportStaff : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string? Phone { get; set; }

    // foriegn key
    public int DepartmentId { get; set; }
    public int ShiftId { get; set; }

    // Navigation Property
    public Department Department { get; set; } = null!;
    public Shifts Shifts { get; set; } = null!;

    public ICollection<SupportTasks> SupportTasks { get; set; } = new List<SupportTasks>();
   


}