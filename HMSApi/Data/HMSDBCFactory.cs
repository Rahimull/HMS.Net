
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

using HMSApi.Data;

public class HMSDBCFactory 
    : IDesignTimeDbContextFactory<HMSDBC>
{
    public HMSDBC CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<HMSDBC>();
        optionsBuilder.UseSqlite("Data Source=Market.db");

        return new HMSDBC(optionsBuilder.Options);
    }
}