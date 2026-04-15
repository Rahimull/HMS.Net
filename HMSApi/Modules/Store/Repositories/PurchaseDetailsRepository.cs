using HMSApi.Data;
using HMSApi.Modules.Store.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Store.Repositories;

public class PurchaseDetailsRepository : BaseRepository<PurchaseDetail>, IPurchaseDetailsRepository
{
    public PurchaseDetailsRepository(HMSDBC context) : base(context)
    {
        
    }
}