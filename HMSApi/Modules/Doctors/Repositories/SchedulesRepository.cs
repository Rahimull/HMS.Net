

using HMSApi.Data;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Doctors.Repositories;

public class SchedulesRepository : BaseRepository<Schedules>, ISchedulesRepository
{
    public SchedulesRepository(HMSDBC context) : base(context)
    {
        
    }
}