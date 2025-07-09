namespace ServerApp.Settings
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = "blog";
        public string PostCollectionName { get; set; } = "posts";
    }
}
