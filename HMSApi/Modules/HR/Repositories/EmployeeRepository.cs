using HMSApi.Data;
using HMSApi.Modules.HR.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.HR.Repositories;

public class EmployeeRepository : BaseRepository<Employees>, IEmployeeRepository
{
    public EmployeeRepository(HMSDBC context) : base(context)
    {
        
    }
}