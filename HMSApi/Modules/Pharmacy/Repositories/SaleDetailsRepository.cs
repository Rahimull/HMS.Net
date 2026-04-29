

using HMSApi.Data;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Pharmacy.Repositories;

public class SaleDetailsRepository : BaseRepository<SaleDetails>, ISaleDetailsRepository
{
    public SaleDetailsRepository(HMSDBC context) : base(context)
    {
        
    }
}