using MongoDB.Driver;
using ServerApp.Models;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        _database = client.GetDatabase(config["MongoDB:DatabaseName"]);
    }

    public IMongoCollection<Post> Posts => _database.GetCollection<Post>("posts");
    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
}
