using InventoryManagementSystem.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Controllers
{

    [ApiController]
    [Route("Api/[Controller]")]
    public class CategoriesController : ControllerBase
    {
            private readonly AppDBContext _db;
            public CategoriesController(AppDBContext db) => _db = db;


        [HttpGet]
            public async Task<IActionResult> GetAll()
            {
                var items = await _db.Categories.AsNoTracking()
                    .OrderBy(c => c.Name)
                    .Select(c => new {c.Id, c.Name, ProductCount = c.products.Count})
                    .ToListAsync();
                return Ok(items);
            }
        }
    }

