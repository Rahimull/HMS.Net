using HMSApi.Data;
using HMSApi.Modules.Store.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Store.Repositories;

public class PurchaseRepository : BaseRepository<Purchases>, IPurchaseRepository
{
    public PurchaseRepository(HMSDBC context) : base(context)
    {
        
    }
}