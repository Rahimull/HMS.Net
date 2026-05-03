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

        for (int i = 0; i < 3; i++) // retry max 3 times
        {
            try
            {
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
                    sequence.LastNumber += 1;
                }

                await _context.SaveChangesAsync();

                return $"BN-{year}-{sequence.LastNumber:D4}";
            }
            catch (DbUpdateConcurrencyException)
            {
                // retry
                _context.ChangeTracker.Clear();
            }
        }

        throw new Exception("Failed to generate batch number");
    }
}