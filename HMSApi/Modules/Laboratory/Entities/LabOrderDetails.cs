using HMSApi.Models;

namespace HMSApi.Modules.Laboratory.Entities;


public class LabOrderDetails : BaseEntity
{


    public decimal ResultValue { get; set; }
    public string? ResultUnit { get; set; }
    public string? ReferenceRange { get; set; }
    public DateTime ResultDate { get; set; }
    public string? Notes { get; set; }
    public string? Comments { get; set; }


    // foreign keys
    public int LabOrderId { get; set; }
    public int LabTestId { get; set; }

    // navigation properties
    public LabOrders LabOrder { get; set; } = null!;
    public LabTests LabTest { get; set; } = null!;
}