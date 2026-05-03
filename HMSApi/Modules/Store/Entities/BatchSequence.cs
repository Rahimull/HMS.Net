using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Store.Entities;


[Index(nameof(Year), nameof(LastNumber), IsUnique = true)]
public class BatchSequence
{
    public int Id { get; set; }
    public int Year { get; set; }
    public int LastNumber { get; set; }

    [Timestamp]
    public byte[] RowVersion { get; set; } = null!;
}