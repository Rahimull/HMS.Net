using HMSApi.Modules.Common.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Common.Services;

public interface ICategoryService : IBaseService<CategoryDto, CreateCategoryDto, UpdateCategoryDto>{}