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
    public class ProductController : ControllerBase
    {
        private readonly IMongoCollection<Product> _product;

        public ProductController(MongoDbService mongoDbService)
        {
            _product = mongoDbService.GetDatabase.GetCollection<Product>("product");
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get()
        {
            try
            {
                var products = await _product.Find(FilterDefinition<Product>.Empty).ToListAsync();

                return Ok(products);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpPost]
        public async Task<ActionResult> Post(Product product)
        {
            try
            {
                await _product.InsertOneAsync(product);

                return StatusCode(201, product);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Product>>> GetById(string id)
        {
            try
            {
                var product = await _product.Find(x => x.Id == id).FirstOrDefaultAsync();

                // Forma alternativa
                // var filter = Builders<Product>.Filter.Eq(x => x.Id, id);

                return product is not null ? Ok(product) : NotFound("Produto não encontrado");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //

        [HttpPatch]
        public async Task<ActionResult> Update(Product product)
        {
            try
            {
                var filter = Builders<Product>.Filter.Eq(x => x.Id, product.Id);

                if (filter != null)
                {
                    await _product.ReplaceOneAsync(filter, product);

                    return Ok(product);
                }

                return NotFound("Produto não encontrado");
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
                var filter = Builders<Product>.Filter.Eq(x => x.Id, id);

                if (filter != null)
                {
                    await _product.DeleteOneAsync(filter);

                    return Ok();
                }

                return NotFound("Produto não encontrado");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } //
    }
}
