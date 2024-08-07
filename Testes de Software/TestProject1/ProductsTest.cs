using _05_08ProjetoAPI.Domains;
using _05_08ProjetoAPI.Interfaces;
using _05_08ProjetoAPI.Repositories;
using Moq;

namespace TestProject1
{
    public class ProductsTest
    {
        /// <summary>
        /// teste para a funcionalidade de listar todos os produtos
        /// </summary>
        [Fact]
        public void Get()
        {
            // arrange

            // lista de produtos
            var productList = new List<Product>
            {
                new Product
                {
                    IdProduct = Guid.NewGuid(),
                    Name = "Produto 1",
                    Price = 78
                },
                new Product
                {
                     IdProduct = Guid.NewGuid(),
                    Name = "Produto 2",
                    Price = 46
                },
                new Product
                {
                     IdProduct = Guid.NewGuid(),
                    Name = "Produto 3",
                    Price = 27
                }
            };

            // cria um objeto de simulação do tipo IProductRepository
            var mockRepository = new Mock<IProductRepository>();

            // configura o método para que quando for acionado retorne algo
            mockRepository.Setup(x => x.Get()).Returns(productList);

            // act

            // executando o método "Get" e atribue a resposta em result
            var result = mockRepository.Object.Get();

            // assert
            Assert.Equal(3, result.Count);
        }

        /// <summary>
        /// teste para a funcionalidade de listar todos os produtos
        /// </summary>
        [Fact]
        public void Post()
        {
            // arrange

            // lista de produtos
            var productList = new List<Product>
            {
                new Product
                {
                    IdProduct = Guid.NewGuid(),
                    Name = "Produto 1",
                    Price = 78
                },
                new Product
                {
                     IdProduct = Guid.NewGuid(),
                    Name = "Produto 2",
                    Price = 46
                },
                new Product
                {
                     IdProduct = Guid.NewGuid(),
                    Name = "Produto 3",
                    Price = 27
                }
            };

            // novo produto a ser adicionado
            var product = new Product
            {
                IdProduct = Guid.NewGuid(),
                Name = "Produto Novo",
                Price = 100
            };

            var mockRepository = new Mock<IProductRepository>();

            mockRepository.Setup(x => x.Post(product)).Callback<Product>(x => productList.Add(product));

            // act
            mockRepository.Object.Post(product);

            // assert
            Assert.Contains(product, productList);

        }

        /// <summary>
        /// teste para a funcionalidade de listar um produto em específico na lista de produtos
        /// </summary>
        [Fact]
        public void GetById()
        {
            // arrange

            // lista de produtos
            var productList = new List<Product>
            {
                new Product
                {
                    IdProduct = Guid.NewGuid(),
                    Name = "Produto 1",
                    Price = 78
                },
                new Product
                {
                     IdProduct = Guid.NewGuid(),
                    Name = "Produto 2",
                    Price = 46
                },
                new Product
                {
                     IdProduct = Guid.NewGuid(),
                    Name = "Produto 3",
                    Price = 27
                }
            };

            // produto procurado
            var productSearch = productList[0].IdProduct;

            var mockRepository = new Mock<IProductRepository>();

            mockRepository.Setup(x => x.GetById(productSearch)).Returns(productList.Find(x => x.IdProduct == productSearch)!);

            // act
            var result = mockRepository.Object.GetById(productSearch);

            // assert
            Assert.Contains(result, productList);
        }

        [Fact]
        public void Put()
        {
            // arrange

            // lista de produtos
            var productList = new List<Product>
    {
        new Product
        {
            IdProduct = Guid.NewGuid(),
            Name = "Produto 1",
            Price = 78
        },
        new Product
        {
             IdProduct = Guid.NewGuid(),
            Name = "Produto 2",
            Price = 46
        },
        new Product
        {
             IdProduct = Guid.NewGuid(),
            Name = "Produto 3",
            Price = 27
        }
    };

            var oldProduct = productList[0];

            // produto para ser atualizado
            var productUpdate = new Product
            {
                IdProduct = productList[0].IdProduct,
                Name = "Produto Atualizado",
                Price = 120
            };

            var mockRepository = new Mock<IProductRepository>();

            mockRepository.Setup(x => x.Put(It.IsAny<Product>())).Callback((Product product) =>
            {
                var index = productList.FindIndex(p => p.IdProduct == product.IdProduct);
                if (index >= 0)
                {
                    productList[index] = product;
                }
            });

            // act
            mockRepository.Object.Put(productUpdate);

            // assert
            Assert.False(oldProduct.Equals(productList[0]));
        }

        [Fact]
        public void Delete()
        {
            // arrange

            // lista de produtos
            var productList = new List<Product>
            {
                new Product
                {
                    IdProduct = Guid.NewGuid(),
                    Name = "Produto 1",
                    Price = 78
                },
                new Product
                {
                     IdProduct = Guid.NewGuid(),
                    Name = "Produto 2",
                    Price = 46
                },
                new Product
                {
                     IdProduct = Guid.NewGuid(),
                    Name = "Produto 3",
                    Price = 27
                }
            };

            var mockRepository = new Mock<IProductRepository>();

            var oldProduct = productList[0];

            mockRepository.Setup(x => x.Delete(productList[0].IdProduct)).Callback(() =>
            {
                productList.Remove(productList[0]);
            });

            // act
            mockRepository.Object.Delete(productList[0].IdProduct);

            // assert
            Assert.DoesNotContain(oldProduct, productList);
        }
    }
}