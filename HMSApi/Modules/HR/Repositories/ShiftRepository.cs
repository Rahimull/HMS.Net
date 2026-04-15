

using HMSApi.Data;
using HMSApi.Modules.HR.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.HR.Repositories;

public class ShiftRepository : BaseRepository<Shift>, IShiftRepository
{
    public ShiftRepository(HMSDBC context) : base(context)
    {
        
    }
}