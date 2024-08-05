using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleDeInventario
{
    public static class Inventario
    {
        public static List<Produto> AdicionarProduto(Produto produto, List<Produto> inventario)
        {
            foreach (var item in inventario)
            {
                if (item.Nome?.ToLower() == produto.Nome?.ToLower())
                {
                    item.Quantidade++;

                    return inventario;
                }
            }

            produto.Quantidade = 1;

            inventario.Add(produto);

            return inventario;
        }
    }
}
