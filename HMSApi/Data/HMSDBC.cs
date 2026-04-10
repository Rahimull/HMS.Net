using System.Linq.Expressions;
using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Emergencies.Entities;
using HMSApi.Modules.Finance.Entities;
using HMSApi.Modules.HR.Entities;
using HMSApi.Modules.IPD.Entities;
using HMSApi.Modules.Laboratory.Entities;
using HMSApi.Modules.Nursing.Entities;
using HMSApi.Modules.OPD.Entities;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Radiology.Entities;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Modules.Reports.Entities;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.SupportServices.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace HMSApi.Data;

public class HMSDBC : IdentityDbContext<AppUser, IdentityRole<int>, int>
{
    public HMSDBC(DbContextOptions<HMSDBC> options) : base(options) { }

    public DbSet<Appointment> Appointments => Set<Appointment>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<MedicalRecord> MedicalRecords => Set<MedicalRecord>();
    public DbSet<Patient> Patients => Set<Patient>();

    // Doctor Module
    public DbSet<Consultation> Consultations => Set<Consultation>();
    public DbSet<Diagnosis> Diagnosis => Set<Diagnosis>();
    public DbSet<Doctor> Doctors => Set<Doctor>();
    public DbSet<PrescriptionDetails> PrescriptionDetails => Set<PrescriptionDetails>();
    public DbSet<Prescriptions> Prescriptions => Set<Prescriptions>();
    public DbSet<Schedules> Schedules => Set<Schedules>();

    // Emergency Modules
    public DbSet<Emergency> Emergencies => Set<Emergency>();
    public DbSet<EmergencyTreatments> EmergencyTreatments => Set<EmergencyTreatments>();

    // Finance Modules
    public DbSet<InvoiceDetails> InvoiceDetails => Set<InvoiceDetails>();
    public DbSet<Invoice> Invoices => Set<Invoice>();public DbSet<Payment> Payments => Set<Payment>();

    // HR Modules
    public DbSet<Employees> Employees => Set<Employees>();
    public DbSet<Payrolls> Payrolls => Set<Payrolls>();
    public DbSet<Shift> Shifts => Set<Shift>();

    // IPD Modules
    public DbSet<Admission> Admissions => Set<Admission>();
    public DbSet<Beds> Beds => Set<Beds>();
    public DbSet<IPDConsultation> IPDConsultations => Set<IPDConsultation>();

    // Laboratory Modules
    public DbSet<Laboratory> Laboratories => Set<Laboratory>();
    public DbSet<LabOrderDetails> LabOrderDetails => Set<LabOrderDetails>();
    public DbSet<LabOrder> LabOrders => Set<LabOrder>();
    public DbSet<LabTests> LabTests => Set<LabTests>();

    // Nursing Modules
    public DbSet<Nurses> Nurses => Set<Nurses>();
    public DbSet<PatientCare> PatientCares => Set<PatientCare>();
    public DbSet<VitalSigns> VitalSigns => Set<VitalSigns>();

    // OPD Modules
    public DbSet<OPDConsulations> OPDConsulations => Set<OPDConsulations>();
    public DbSet<OPDPrescriptionDetails> OPDPrescriptionDetails => Set<OPDPrescriptionDetails>();
    public DbSet<OPDPrescriptions> OPDPrescriptions => Set<OPDPrescriptions>();
    public DbSet<OPDVisits> OPDVisits => Set<OPDVisits>();

    // Pharmacy Modules
    public DbSet<Medicines> Medicines => Set<Medicines>();
    public DbSet<MedicineStock> MedicineStocks => Set<MedicineStock>();
    public DbSet<PharmacySales> PharmacySales => Set<PharmacySales>();
    public DbSet<PharmacySalesdetails> PharmacySalesdetails => Set<PharmacySalesdetails>();

    // Radiology Modules
    public DbSet<ImagingOrders> ImagingOrders => Set<ImagingOrders>();
    public DbSet<ImagingOrdersDetails> ImagingOrdersDetails => Set<ImagingOrdersDetails>();
    public DbSet<ImagingTest> ImagingTests => Set<ImagingTest>();


    // Reprots Modules
    public DbSet<Report> Reports => Set<Report>();

    // Store Modules
    public DbSet<Items> Items => Set<Items>();
    public DbSet<ItemStock> ItemStocks => Set<ItemStock>();
    public DbSet<PurchaseDetail> PurchaseDetails => Set<PurchaseDetail>();
    public DbSet<Purchases> Purchases => Set<Purchases>();
    public DbSet<Suppliers> Suppliers => Set<Suppliers>();

    // Support Services Modules
    public DbSet<SupportStaff> SupportStaffs => Set<SupportStaff>();
    public DbSet<SupportTasks> SupportTasks => Set<SupportTasks>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Patient (1) <-> MedicalRecord (1)
        modelBuilder.Entity<Patient>()
            .HasOne(p => p.MedicalRecord)
            .WithOne(m => m.Patient)
            .HasForeignKey<MedicalRecord>(m => m.PatientId)
            .OnDelete(DeleteBehavior.Cascade);

        // Ensure Uniqueness
        modelBuilder.Entity<MedicalRecord>()
            .HasIndex(m => m.PatientId)
            .IsUnique();

        // Soft Delete Flag

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
            {
                // e =>
                var parameter = Expression.Parameter(entityType.ClrType, "e");

                // e.IsDeleted
                var property = Expression.Property(parameter, nameof(BaseEntity.IsDeleted));

                // e.IsDeleted == false
                var condition = Expression.Equal(
                     property,
                     Expression.Constant(false)
                );
                var lambda = Expression.Lambda(condition, parameter);

                modelBuilder.Entity(entityType.ClrType)
                     .HasQueryFilter(lambda);

            }
        }



        base.OnModelCreating(modelBuilder);
    }

}