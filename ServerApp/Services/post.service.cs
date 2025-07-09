using MongoDB.Driver;
using ServerApp.Models;
using Microsoft.Extensions.Options;
using ServerApp.Settings;

namespace ServerApp.Services
{
    public class PostService
    {
        private readonly IMongoCollection<Post> _posts;

        public PostService(IOptions<MongoDbSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _posts = database.GetCollection<Post>(options.Value.PostCollectionName);
        }

        public Task<List<Post>> GetAllAsync() =>
            _posts.Find(_ => true).ToListAsync();

        public Task<Post?> GetByIdAsync(string id) =>
            _posts.Find(p => p.id == id).FirstOrDefaultAsync();

        public Task CreateAsync(Post post) =>
            _posts.InsertOneAsync(post);

        public async Task<bool> UpdateAsync(string id, Post updated)
        {
            var result = await _posts.ReplaceOneAsync(p => p.id == id, updated);
            return result.MatchedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _posts.DeleteOneAsync(p => p.id == id);
            return result.DeletedCount > 0;
        }
    }
}
