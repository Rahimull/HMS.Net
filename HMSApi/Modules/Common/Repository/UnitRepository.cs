using HMSApi.Data;
using HMSApi.Modules.Common.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Common.Repositories;

public class UnitRepository : BaseRepository<Unit>, IUnitRepository
{
    public UnitRepository(HMSDBC context) : base(context)
    {
        
    }
}