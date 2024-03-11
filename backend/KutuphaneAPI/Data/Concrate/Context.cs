using KutuphaneAPI.Entity;
using Microsoft.EntityFrameworkCore;

namespace KutuphaneAPI.Data.Concrate
{
    public class Context:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-AB7RAGL\\SQLEXPRESS;initial Catalog=KutuphaneAPI;Integrated Security=true; TrustServerCertificate=True"); 

        }
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
