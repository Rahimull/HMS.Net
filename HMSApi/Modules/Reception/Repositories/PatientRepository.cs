


using HMSApi.Data;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Reception.Repositories;


public class PatientRepository : BaseRepository<Patient>, IPatientRepository
{
    public PatientRepository(HMSDBC context) : base(context)
    {
        
    }
}