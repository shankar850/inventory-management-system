using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.DTO
{
    public class ProdcutCreateDto
    {
        public class ProductCreateDto
        {
            [Required,MaxLength]
            public string Name { get; set; } = string.Empty;

            [Required, StringLength(450)]
            public string Sku { get; set; } = string.Empty;
            [Required, MaxLength]
            public string? Description { get; set; }

            [Range(0.01, 10000000)]
            public decimal Price { get; set; }

            [Range(0, int.MaxValue)]
            public int QuantityInStock { get; set; }

            [Range(0, int.MaxValue)]
            public int ReorderLevel { get; set; }

            [Range(1, int.MaxValue)]
            public int CategoryId { get; set; }
        }
    }
}
