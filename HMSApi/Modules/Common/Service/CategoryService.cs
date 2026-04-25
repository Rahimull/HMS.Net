using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Common.DTOs;
using HMSApi.Modules.Common.Entities;
using HMSApi.Modules.Common.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Common.Services;


public class CategoryService : BaseService<Category, CategoryDto, CreateCategoryDto, UpdateCategoryDto>, ICategoryService
{
    public CategoryService(ICategoryRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Category> BuildSpecification(QueryParams query)
    {
        return new CategorySpecification(query);
    }
}