

using HMSApi.Data;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Pharmacy.Repositories;

public class PharmacySaleRepository : BaseRepository<PharmacySales>, IPharmacySaleRepository
{
    public PharmacySaleRepository(HMSDBC context) : base(context)
    {
        
    }
}