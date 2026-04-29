

using HMSApi.Data;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Pharmacy.Repositories;

public class SaleRepository : BaseRepository<Sale>, ISaleRepository
{
    public SaleRepository(HMSDBC context) : base(context)
    {
        
    }
}