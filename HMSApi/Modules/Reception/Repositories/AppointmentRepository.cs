

using HMSApi.Data;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Reception.Repositories;

public class AppointmentRepository : BaseRepository<Appointment>, IAppointmentRepository
{
    public AppointmentRepository(HMSDBC context) : base(context)
    {
        
    }
}