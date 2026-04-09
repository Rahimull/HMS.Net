using HMSApi.Models;

namespace HMSApi.Modules.Radiology.Entities;


public class ImagingOrdersDetails: BaseEntity
{
    public string? Report { get; set; }
    public string? ImagingFilePath { get; set; }
    public DateTime ResultDate { get; set; }
    public string? Notes { get; set; }
    public string? Comments { get; set; }


    // foreign keys
    public int ImagingOrderId { get; set; }
    public int ImagingTestId { get; set; }

    // navigation properties
    public ImagingOrders ImagingOrder { get; set; } = null!;
    public ImagingTest ImagingTest { get; set; } = null!;
}