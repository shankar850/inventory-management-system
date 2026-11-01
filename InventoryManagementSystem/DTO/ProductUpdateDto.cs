using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.DTO
{
    public class ProductUpdateDto
    {
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Range(0.01, 10000000)]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue)]
        public int ReorderLevel { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId
        {
            get; set;
        }
    }
}
