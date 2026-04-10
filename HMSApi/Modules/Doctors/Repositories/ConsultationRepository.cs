

using HMSApi.Data;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Doctors.Repositories;

public class ConsultationRepository : BaseRepository<Consultation>, IConsultationRepository
{
    public ConsultationRepository(HMSDBC context) : base(context)
    {
        
    }
}