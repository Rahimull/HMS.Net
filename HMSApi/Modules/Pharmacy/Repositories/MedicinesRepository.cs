using HMSApi.Data;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Pharmacy.Repositories;

public class MedicineRepository : BaseRepository<Medicines>, IMedicineRepository
{
    public MedicineRepository(HMSDBC context) : base(context)
    {
        
    }
}