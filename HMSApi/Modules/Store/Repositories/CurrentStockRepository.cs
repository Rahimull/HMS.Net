using HMSApi.Data;
using HMSApi.Modules.Store.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Store.Repositories;

public class CurrentStockRepository : BaseRepository<CurrentStock>, ICurrentStockRepository
{
    public CurrentStockRepository(HMSDBC context) : base(context)
    {
        
    }
}