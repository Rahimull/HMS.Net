using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Data;

public class HMSDbContext : DbContext
{
    public HMSDbContext(DbContextOptions<HMSDbContext> options):base(options){}

    DbSet<Customer> Customers => Set<Customer>();
    DbSet<FinanceTransaction> FinanceTransactions => Set<FinanceTransaction>();
    DbSet<Medicine> Medicines => Set<Medicine>();
    DbSet<Purchase> Purchases => Set<Purchase>();
    DbSet<PurchaseItem> purchaseItems => Set<PurchaseItem>();
    DbSet<Sale> Sales=> Set<Sale>();
    DbSet<SaleItem> SaleItems=>Set<SaleItem>();
    DbSet<Supplier> Suppliers=>Set<Supplier>();
    DbSet<User> Users=> Set<User>();


    protected override void OModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Sale>()
            .HasMany(s=> s.SaleItemes)
            .WithOne(si=>si.Sale)
            .HasForeignKey(si=> si.SaleId);
    }
}