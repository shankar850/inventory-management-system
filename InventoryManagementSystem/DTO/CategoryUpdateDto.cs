using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.DTO
{
    public class CategoryUpdateDto
    {
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
    }
}
