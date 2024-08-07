using _05_08ProjetoAPI.Domains;

namespace _05_08ProjetoAPI.Interfaces
{
    public interface IProductRepository
    {
        // para listar todos os produtos
        public List<Product> Get();

        // para listar um só produto pelo seu id
        public Product GetById(Guid id);

        // para adicionar um novo produto
        public void Post(Product product);

        // para atualizar as informações de um produto já existente
        public void Put(Product product);

        // para deletar um produto
        public void Delete(Guid id);
    }
}
