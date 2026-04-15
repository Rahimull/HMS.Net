

using HMSApi.Data;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Pharmacy.Repositories;

public class MedicineStockRepository : BaseRepository<MedicineStock>, IMedicineStockRepository
{
    public MedicineStockRepository(HMSDBC context) : base(context)
    {
        
    }
}