namespace InventoryManagementSystem.Model
{
    public class Category
    {
        public int Id {get; set;}
        public string Name {get; set;}= string.Empty;
        public List<Product> products { get; set; } = new();
    }
}
