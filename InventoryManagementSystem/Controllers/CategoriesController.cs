using InventoryManagementSystem.Data;
using InventoryManagementSystem.DTO;
using InventoryManagementSystem.Model;
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
                .Select(c => new { c.Id, c.Name, ProductCount = c.products.Count })
                .ToListAsync();
            return Ok(items);
        }


        [HttpPost]
        public async Task<IActionResult> Create(CategoryCreateDto dto)
        {
            var name = dto.Name;
            var exist = await _db.Categories.AnyAsync(c => c.Name == name);
            if (exist)
                return Conflict(new { message = "Category Already exist." });

            var category = new Category { Name = name };

            _db.Categories.Add(category);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = category.Id }, new { category.Id, category.Name });
        }
    }
}



