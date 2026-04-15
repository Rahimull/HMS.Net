using HMSApi.Modules.Store.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Store.Services;

public interface IItemService : IBaseService<ItemDto, CreateItemDto, UpdateItemDto>{}