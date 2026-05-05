

using HMSApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ProductController : ControllerBase
{
    private static List<Product> products = new()
    {
        new Product{Id = 1, Name="A", Quntity=10},
        new Product{Id = 2, Name="B", Quntity=100},
        new Product{Id = 3, Name="C", Quntity=30}
    };


    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(products);

    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var reuslt = products.FirstOrDefault(p => p.Id == id);
        if (reuslt == null) return NotFound();
        return Ok(reuslt);
    }

    [HttpPost]
    public IActionResult Create(Product product)
    {
        product.Id = products.Max(p=> p.Id) + 1;
        products.Add(product);
        return Ok(product);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var result = products.FirstOrDefault(p => p.Id == id);
        if(result == null) return NotFound();
        products.Remove(result);
        return NoContent();
    }


    [HttpPut("{id}")]
    public IActionResult Update(int id, Product product)
    {
        var result = products.FirstOrDefault(p => p.Id == id);
        if (result == null) return NotFound();
        result.Name = product.Name;
        result.Quntity = product.Quntity;
        return Ok(result);
    }
}