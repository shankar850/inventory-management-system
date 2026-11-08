using InventoryManagementSystem.Data;
using InventoryManagementSystem.DTO;
using InventoryManagementSystem.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static InventoryManagementSystem.DTO.ProdcutCreateDto;

namespace InventoryManagementSystem.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDBContext _db;
        public ProductsController(AppDBContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _db.Products.AsNoTracking()
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Sku,
                    p.Price,
                    p.QuantityInStock,
                    p.ReorderLevel,
                    CategoryName = p.Category!.Name
                }).ToListAsync();
            return Ok(items);
        }

        
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _db.Products.AsNoTracking()
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Sku,
                    p.Description,
                    p.Price,
                    p.QuantityInStock,
                    p.ReorderLevel,
                    p.CategoryId,
                    CategoryName = p.Category!.Name
                })
                .FirstOrDefaultAsync();

            if (product == null)
                return NotFound();

            return Ok(product);
        }


        [HttpPost]
        public async Task<IActionResult> Create(ProductCreateDto dto)
        {
            var categoryExists = await _db.Categories.AnyAsync(c => c.Id == dto.CategoryId);
            if (!categoryExists)
                return BadRequest(new { message = "Category does not exist." });

            var sku = dto.Sku.Trim();
            var skuExists = await _db.Products.AnyAsync(p => p.Sku == sku);
            if (skuExists)
                return Conflict(new { message = "SKU already exists." });

            var product = new Product
            {
                Name = dto.Name,
                Sku = sku,
                Description = dto.Description,
                Price = dto.Price,
                QuantityInStock = dto.QuantityInStock,
                ReorderLevel = dto.ReorderLevel,
                CategoryId = dto.CategoryId
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, new { product.Id, product.Name });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, ProductUpdateDto dto)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            var categoryExists = await _db.Categories.AnyAsync(c => c.Id == dto.CategoryId);
            if (!categoryExists)
                return BadRequest(new { message = "Category does not exist." });

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.ReorderLevel = dto.ReorderLevel;
            product.CategoryId = dto.CategoryId;

            await _db.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();

            return NoContent();

        }

        //[HttpPost]
        //public async Task<IActionResult> Create(Product product)
        //{
        //    _db.Products.Add(product);
        //    await _db.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetAll), new { id = product.Id }, product);
        //}
    }
    
}
