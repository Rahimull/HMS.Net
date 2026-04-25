using HMSApi.Data;
using HMSApi.Modules.Common.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Common.Repositories;

public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
{
    public CategoryRepository(HMSDBC context) : base(context)
    {
        
    }
}