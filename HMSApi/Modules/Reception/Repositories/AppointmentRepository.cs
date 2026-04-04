

using HMSApi.Data;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Repositories;

namespace HMSApi.Mudoles.Reception.Repositories;

public class AppointmentRepository : BaseRepository<Appointment>, IAppointmentRepository
{
    public AppointmentRepository(HMSDBC context) : base(context)
    {
        
    }
}