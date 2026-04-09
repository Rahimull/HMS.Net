using HMSApi.Models;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Modules.Nursing.Entities;


public class VitalSigns : BaseEntity
{

    public DateTime MeasurementTime { get; set; }
    public decimal Temperature { get; set; }
    public int HeartRate { get; set; }
    public int BloodPressure { get; set; }
    public int RespiratoryRate { get; set; }
    public decimal OxygenSaturation { get; set; }

    public string? Notes {get; set;}

    // foriegn keys

    public int PatientId { get; set; }
    public int NurseId {get; set;}
    public int AdmissionId {get; set;}

    // Navigation Properties

     public Patient Patient { get; set; } = null!;
    public Nurses Nurse { get; set; } = null!;
    public Admissions Admission { get; set; } = null!;

}