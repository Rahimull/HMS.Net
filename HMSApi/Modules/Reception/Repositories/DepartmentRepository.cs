

using HMSApi.Data;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Reception.Repositories;

public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
{
    public DepartmentRepository(HMSDBC context) : base(context)
    {
        
    }
}