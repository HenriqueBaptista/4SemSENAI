using GerenciamentoDeLivros.Itens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoDeLivros
{
    public static class Gerenciamento
    {
        public static bool AdicionarLivros(string titulo, string autor, string genero)
        {
            var newLivro = new Livro
            {
                Titulo = titulo,
                Autor = autor,
                Genero = genero
            };

            var estanteAdicionar = new EstanteLivros();

            estanteAdicionar.Livros?.Add(newLivro);

            return true;
        }
    }
}
