using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace ServerApp.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        public string? title { get; set; }
        public string? content { get; set; }
        public string? imageUrl { get; set; }
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        public string? likes { get; set; }
        public List<string> comments { get; set; } = new();
    }
}
