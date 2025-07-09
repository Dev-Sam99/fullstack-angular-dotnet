using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace ServerApp.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Likes { get; set; }
        public List<string> Comments { get; set; } = new();
    }
}
