using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using minimalApiMongo.Domains;
using minimalApiMongo.Service;
using MongoDB.Driver;

namespace minimalApiMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IMongoCollection<User> _user;

        public UserController(MongoDbService mongoDbService)
        {
            _user = mongoDbService.GetDatabase.GetCollection<User>("user");
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            try
            {
                var users = await _user.Find(FilterDefinition<User>.Empty).ToListAsync();

                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpPost]
        public async Task<ActionResult> Post(User user)
        {
            try
            {
                await _user.InsertOneAsync(user);

                return StatusCode(201, user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> GetById(string id)
        {
            try
            {
                var user = await _user.Find(x => x.Id == id).FirstOrDefaultAsync();

                return user is not null ? Ok(user) : NotFound("Usuário não encontrado");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpPatch]
        public async Task<ActionResult> Update(User user)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, user.Id);

                if (filter != null)
                {
                    await _user.ReplaceOneAsync(filter, user);

                    return Ok(user);
                }

                return NotFound("Usuário não encontrado");
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
                var filter = Builders<User>.Filter.Eq(x => x.Id, id);

                if (filter != null)
                {
                    await _user.DeleteOneAsync(filter);

                    return Ok();
                }

                return NotFound("Usuário não encontrado");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //
    }
}
