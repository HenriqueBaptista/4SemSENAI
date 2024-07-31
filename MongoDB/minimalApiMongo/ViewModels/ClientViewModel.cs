using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using minimalApiMongo.Domains;
using System.Text.Json.Serialization;

namespace minimalApiMongo.ViewModels
{
    public class ClientViewModel
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

        public ClientViewModel()
        {
            AdditionalAtributes = new Dictionary<string, string>();
        }

        // referência ao usuário
        [BsonElement("userId")]
        public string? UserId { get; set; }


        [BsonIgnore]
        [JsonIgnore]
        public User? User { get; set; }
    }
}
