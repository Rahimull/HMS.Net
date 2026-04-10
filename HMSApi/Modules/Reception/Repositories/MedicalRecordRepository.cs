

using HMSApi.Data;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Reception.Repositories;

public class MedicalRecordRepository : BaseRepository<MedicalRecord>, IMedicalRecordRepository
{
    public MedicalRecordRepository(HMSDBC context) : base(context)
    {
        
    }
}