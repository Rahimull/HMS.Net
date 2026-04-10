

using HMSApi.Data;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Doctors.Repositories;

public class PrescriptionDetailsRepository : BaseRepository<PrescriptionDetails>, IPrescriptionDetailsRepository
{
    public PrescriptionDetailsRepository(HMSDBC context) : base(context)
    {
        
    }
}