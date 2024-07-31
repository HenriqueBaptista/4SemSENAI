using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using minimalApiMongo.Domains;
using minimalApiMongo.Service;
using minimalApiMongo.ViewModels;
using MongoDB.Driver;

namespace minimalApiMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IMongoCollection<Client> _client;
        private readonly IMongoCollection<User> _user;

        public ClientController(MongoDbService mongoDbService)
        {
            _client = mongoDbService.GetDatabase.GetCollection<Client>("client");
            _user = mongoDbService.GetDatabase.GetCollection<User>("user");
        }

        [HttpGet]
        public async Task<ActionResult<List<Client>>> Get()
        {
            try
            {
                var clients = await _client.Find(FilterDefinition<Client>.Empty).ToListAsync();

                return Ok(clients);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpPost]
        public async Task<ActionResult> Post(ClientViewModel clientViewModel)
        {
            try
            {
                var newClient = new Client();

                newClient.Cpf = clientViewModel.Cpf;
                newClient.Phone = clientViewModel.Phone;
                newClient.Address = clientViewModel.Address;
                newClient.AdditionalAtributes = clientViewModel.AdditionalAtributes;
                newClient.UserId = clientViewModel.UserId;

                var user = await _user.Find(x => x.Id == newClient.UserId).FirstOrDefaultAsync();

                if (user == null)
                {
                    return NotFound("Usuário não existe");
                }

                newClient.User = user;

                await _client.InsertOneAsync(newClient);

                return Ok(newClient);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Client>>> GetById(string id)
        {
            try
            {
                var client = await _client
                    .Find(x => x.Id == id)
                    .FirstOrDefaultAsync();

                return client is not null ? Ok(client) : NotFound("Cliente não encontrado");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpPatch]
        public async Task<ActionResult> Update(ClientViewModel clientViewModel)
        {
            try
            {
                var filter = Builders<Client>.Filter.Eq(x => x.Id, clientViewModel.Id);

                if (filter != null)
                {
                    var updateClient = new Client();

                    updateClient.Cpf = clientViewModel.Cpf;
                    updateClient.Phone = clientViewModel.Phone;
                    updateClient.Address = clientViewModel.Address;
                    updateClient.AdditionalAtributes = clientViewModel.AdditionalAtributes;
                    updateClient.UserId = clientViewModel.UserId;

                    var user = await _user.Find(x => x.Id == updateClient.UserId).FirstOrDefaultAsync();

                    if (user == null)
                    {
                        return NotFound("Usuário não existe");
                    }

                    updateClient.User = user;

                    await _client.ReplaceOneAsync(filter, updateClient);

                    return Ok(updateClient);
                }

                return NotFound("Cliente não encontrado");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                var filter = Builders<Client>.Filter.Eq(x => x.Id, id);

                if (filter != null)
                {
                    await _client.DeleteOneAsync(filter);

                    return Ok();
                }

                return NotFound("Cliente não encontrado");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //
    }
}
