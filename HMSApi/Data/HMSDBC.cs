using System.Linq.Expressions;
using HMSApi.Models;
using HMSApi.Mudoles.Reception.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace HMSApi.Data;

public class HMSDBC : IdentityDbContext<AppUser, IdentityRole<int>, int>
{
    public HMSDBC(DbContextOptions<HMSDBC> options) : base(options) { }

    public DbSet<Appointment> Appointments => Set<Appointment>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<ReceptionDoctor> ReceptionDoctors => Set<ReceptionDoctor>();
    public DbSet<MedicalRecord> MedicalRecords => Set<MedicalRecord>();
    public DbSet<Patient> Patients => Set<Patient>();




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