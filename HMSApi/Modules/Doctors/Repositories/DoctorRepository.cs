

using HMSApi.Data;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Doctors.Repositories;

public class DoctorRepository : BaseRepository<Doctor>, IDoctorRepository
{
    public DoctorRepository(HMSDBC context) : base(context)
    {
        
    }
}