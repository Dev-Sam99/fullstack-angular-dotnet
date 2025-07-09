using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

namespace ServerApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }

        // Optional: seed or configure models
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Post>().HasData(
                new Post
                {
                    Id = "1",
                    Title = "Welcome to the Blog",
                    Content = "This is the first sample post.",
                    ImageUrl = "https://via.placeholder.com/600x300",
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}
