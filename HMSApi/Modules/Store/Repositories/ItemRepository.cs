using HMSApi.Data;
using HMSApi.Modules.Store.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Store.Repositories;

public class ItemRepository : BaseRepository<Item>, IItemRepository
{
    public ItemRepository(HMSDBC context) : base(context)
    {
        
    }
}