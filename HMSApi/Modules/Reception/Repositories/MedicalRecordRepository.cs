

using HMSApi.Data;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Repositories;

namespace HMSApi.Mudoles.Reception.Repositories;

public class MedicalRecordRepository : BaseRepository<MedicalRecord>, IMedicalRecordRepository
{
    public MedicalRecordRepository(HMSDBC context) : base(context)
    {
        
    }
}