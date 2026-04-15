using HMSApi.Data;
using HMSApi.Modules.Store.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Store.Repositories;

public class ItemStockRepository : BaseRepository<ItemStock>, IItemStockRepository
{
    public ItemStockRepository(HMSDBC context) : base(context)
    {
        
    }
}