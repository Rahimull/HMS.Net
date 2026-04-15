

using HMSApi.Data;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Pharmacy.Repositories;

public class PharmacySaleDetailsRepository : BaseRepository<PharmacySalesdetails>, IPharmacySaleDetailsRepository
{
    public PharmacySaleDetailsRepository(HMSDBC context) : base(context)
    {
        
    }
}