using HMSApi.Models;

namespace HMSApi.Modules.OPD.Entities;



public class OPDConsulations : BaseEntity
{

    public string? ChiefComplaint { get; set; }
    public string? History { get; set; }
    public string? ExaminationFindings { get; set; }
    public string? DiagnosisSummary { get; set; }
    public string? AdviceGiven { get; set; }

    public string ConsultationNotes { get; set; } = null!;
    public string? Prescription { get; set; }
    public string? FollowUpInstructions { get; set; }
    public DateOnly? NextVisitDate { get; set; }
    public TimeOnly? NextVisitTime { get; set; }
    public decimal? ConsultationFee { get; set; }


    // Foreign key to OPDVisit
    public int OPDVisitId { get; set; }
    // Navigation property
    public OPDVisits OPDVisit { get; set; } = null!;
}