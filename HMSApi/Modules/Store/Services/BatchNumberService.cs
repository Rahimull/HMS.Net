using HMSApi.Data;
using HMSApi.Modules.Store.Entities;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Store.Services;


public class BatchNumberService
{
    private readonly HMSDBC _context;

    public BatchNumberService(HMSDBC context)
    {
        _context = context;
    }

    public async Task<string> GenerateAsync()
    {
        var year = DateTime.UtcNow.Year;
        using var transaction = await _context.Database.BeginTransactionAsync();

        var sequence = await _context.Set<BatchSequence>()
            .FirstOrDefaultAsync(x => x.Year == year);

        if (sequence == null)
        {
            sequence = new BatchSequence
            {
                Year = year,
                LastNumber = 1
            };

            _context.Add(sequence);
        }
        else
        {
            sequence.LastNumber +=1;
        }

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();
        return $"BN-{year}-{sequence.LastNumber:D4}";

    }
}