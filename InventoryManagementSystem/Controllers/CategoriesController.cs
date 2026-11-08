using InventoryManagementSystem.Data;
using InventoryManagementSystem.DTO;
using InventoryManagementSystem.Model;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{id:int}")]
        public async Task <IActionResult> GetById (int id)
        {
            var category = await _db.Categories.AsNoTracking()
                .Where(c => c.Id == id)
                .Select(c => new {c.Id, c.Name,ProductCount = c.products.Count})
                .FirstOrDefaultAsync();

            if (category == null)
                return NotFound();

            return CreatedAtAction(nameof(GetById), new { id = category.Id }, new { category.Id, category.Name });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CategoryUpdateDto dto)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            var name = dto.Name.Trim();

            var duplicate = await _db.Categories.AnyAsync(c => c.Name == name && c.Id != id);
            if (duplicate)
                return Conflict(new { message = "Category already exists." });

            category.Name = name;
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            var hasProducts = await _db.Products.AnyAsync(p => p.CategoryId == id);
            if (hasProducts)
                return Conflict(new { message = "Cannot delete a category that still has products." });

            _db.Categories.Remove(category);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}



