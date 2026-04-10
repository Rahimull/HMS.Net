

using HMSApi.Data;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Doctors.Repositories;

public class DiagnosisRepository : BaseRepository<Diagnosis>, IDiagnosisRepository
{
    public DiagnosisRepository(HMSDBC context) : base(context)
    {
        
    }
}