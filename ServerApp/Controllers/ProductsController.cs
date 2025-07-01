using Microsoft.AspNetCore.Mvc;

namespace ServerApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var products = new[]
        {
            new { Id = 1, Name = "Laptop", Price = 1500 },
            new { Id = 2, Name = "Mouse", Price = 25 },
            new { Id = 3, Name = "Keyboard", Price = 45 }
        };
        return Ok(products);
    }
}
