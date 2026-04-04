

using HMSApi.Data;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Repositories;

namespace HMSApi.Mudoles.Reception.Repositories;

public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
{
    public DepartmentRepository(HMSDBC context) : base(context)
    {
        
    }
}