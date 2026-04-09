using HMSApi.Common.Enums;
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.OPD.Entities;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.Laboratory.Entities;


public class LabOrders : BaseEntity
{
    
    public DateTime OrderDate { get; set; }
    public string? Notes { get; set; }
    public LabOrderStatus Status { get; set; } = LabOrderStatus.Pending;

    // foreign keys
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public int LaboratoryId { get; set; }
    public int OPDVisitId { get; set; }
    public int AdmissionId { get; set; }

    // navigation properties
    public Patient Patient { get; set; } = null!;
    public Doctors Doctor { get; set; } = null!;
    public Laboratory Laboratory { get; set; } = null!;
    public OPDVisits OPDVisit { get; set; } = null!;

    public List<LabOrderDetails> LabOrderDetails { get; set; } = new List<LabOrderDetails>();
}