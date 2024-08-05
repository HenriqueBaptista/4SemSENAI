namespace ControleDeInventario.Test
{
    public class InventarioUnitTest
    {
        [Theory]
        [InlineData("arroz", "feijao", "macarrao", "queijo", true)]
        [InlineData("pao", "pao", "queijo", "queijo", false)]
        public void ProdutoFoiAdicionadoOuIncrementado(string p1, string p2, string p3, string p4, bool resultado)
        {
            // arrange
            var produto1 = new Produto()
            {
                Nome = p1
            };

            var produto2 = new Produto()
            {
                Nome = p2
            };

            var produto3 = new Produto()
            {
                Nome = p3
            };

            var produto4 = new Produto()
            {
                Nome = p4
            };

            var inventario = new List<Produto>();

            // act
            var AdicionarProdutos1 = Inventario.AdicionarProduto(produto1, inventario);
            var AdicionarProdutos2 = Inventario.AdicionarProduto(produto2, inventario);
            var AdicionarProdutos3 = Inventario.AdicionarProduto(produto3, inventario);
            var AdicionarProdutos4 = Inventario.AdicionarProduto (produto4, inventario);

            // assert
            if (resultado)
                Assert.Equal(inventario.Count, 4, 0.001);
            else
                Assert.Equal(inventario.Count, 2, 0.001);
        }
    }
}