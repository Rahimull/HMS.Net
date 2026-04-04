


using HMSApi.Data;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Repositories;

namespace HMSApi.Mudoles.Reception.Repositories;


public class PatientRepository : BaseRepository<Patient>, IPatientRepository
{
    public PatientRepository(HMSDBC context) : base(context)
    {
        
    }
}