using MongoDB.Driver;
using ServerApp.Models;
using System.Net;
using System.Security.Authentication;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration config)
    {
        // Ensure TLS 1.2 is used globally
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

        // Use SRV URL and enforce TLS
        var settings = MongoClientSettings.FromUrl(new MongoUrl(config["MongoDbSettings:ConnectionString"]));
        settings.SslSettings = new SslSettings { EnabledSslProtocols = SslProtocols.Tls12 };

        var client = new MongoClient(settings);
        _database = client.GetDatabase(config["MongoDbSettings:DatabaseName"]);
    }

    public IMongoCollection<Post> Posts => _database.GetCollection<Post>("posts");
    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
}
