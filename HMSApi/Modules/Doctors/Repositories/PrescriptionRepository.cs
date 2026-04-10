

using HMSApi.Data;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Doctors.Repositories;

public class PrescriptionRepository : BaseRepository<Prescriptions>, IPrescriptionRepository
{
    public PrescriptionRepository(HMSDBC context) : base(context)
    {
        
    }
}