using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations.Schema;

namespace minimalApiMongo.Domains
{
    public class Client
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("cpf")]
        public string? Cpf { get; set; }

        [BsonElement("phone")]
        public string? Phone { get; set; }

        [BsonElement("address")]
        public string? Address { get; set; }

        public Dictionary<string, string> AdditionalAtributes { get; set; }

        public Client()
        {
            AdditionalAtributes = new Dictionary<string, string>();
        }

        // referência ao usuário
        [BsonElement("userId")]
        [BsonIgnore]
        public string? UserId { get; set; }
        public User? User { get; set; }
    }
}
