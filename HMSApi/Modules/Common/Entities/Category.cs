using HMSApi.Models;
using HMSApi.Modules.Store.Entities;

namespace HMSApi.Modules.Common.Entities;


public class Category : BaseEntity
{
    public String Name { get; set; } = null!;
    public ICollection<Item> Items { get; set; } = new List<Item>();
}