using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace minimalApiMongo.Domains
{
    public class Order
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("date")]
        public DateTime? Date { get; set; }

        [BsonElement("status")]
        public string? Status { get; set; }

        // Referência aos produtos
        [BsonElement("productId")]
        [BsonIgnore]
        public List<string>? ProductId { get; set; }
        public List<Product>? Products { get; set; }

        // Referência ao cliente
        [BsonElement("clientId")]
        [BsonIgnore]
        public string? ClientId { get; set; }
        public Client? Client { get; set; }
    }
}
