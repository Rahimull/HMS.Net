using HMSApi.Data;
using HMSApi.Modules.Store.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Store.Repositories;

public class SuplierRepository : BaseRepository<Suppliers>, ISuplierRepository
{
    public SuplierRepository(HMSDBC context) : base(context)
    {
        
    }
}