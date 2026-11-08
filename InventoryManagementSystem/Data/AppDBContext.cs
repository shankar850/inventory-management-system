using InventoryManagementSystem.Model;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder b)
        {
            b.Entity<Product>().Property(p => p.Price).HasPrecision(18, 2);
            b.Entity<Product>().HasIndex(p => p.Sku).IsUnique();

            b.Entity<User>().HasIndex(u => u.Username).IsUnique();

            b.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics" },
                new Category { Id = 2, Name = "Grocery" },
                new Category { Id = 3, Name = "Stationery" });
        }
    }
}
