using InventoryManagementSystem.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDBContext _db;
        public DashboardController(AppDBContext db) => _db = db;

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var totalProducts = await _db.Products.CountAsync();
            var totalCategories = await _db.Categories.CountAsync();
            var lowStockCount = await _db.Products.CountAsync(p => p.QuantityInStock <= p.ReorderLevel);
            var outOfStockCount = await _db.Products.CountAsync(p => p.QuantityInStock == 0);
            var stockValue = await _db.Products.SumAsync(p => (decimal?)(p.Price * p.QuantityInStock)) ?? 0m;

            return Ok(new { totalProducts, totalCategories, lowStockCount, outOfStockCount, stockValue });
        }

        [HttpGet("low-stock")]
        public async Task<IActionResult> GetLowStock()
        {
            var items = await _db.Products.AsNoTracking()
                .Where(p => p.QuantityInStock <= p.ReorderLevel)
                .OrderBy(p => p.QuantityInStock)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Sku,
                    CategoryName = p.Category!.Name,
                    p.QuantityInStock,
                    p.ReorderLevel
                })
                .ToListAsync();

            return Ok(items);
        }
    }
}