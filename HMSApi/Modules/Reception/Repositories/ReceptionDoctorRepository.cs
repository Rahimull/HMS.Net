

using HMSApi.Data;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Repositories;

namespace HMSApi.Mudoles.Reception.Repositories;

public class ReceptionDoctorRepository : BaseRepository<ReceptionDoctor>, IReceptionDoctorRepository
{
    public ReceptionDoctorRepository(HMSDBC context) : base(context)
    {
        
    }
}