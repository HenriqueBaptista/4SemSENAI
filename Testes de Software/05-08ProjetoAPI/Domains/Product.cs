using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace _05_08ProjetoAPI.Domains
{
    public class Product
    {
        // id do produto
        [Key]
        public Guid IdProduct { get; set; } = Guid.NewGuid();

        // nome do produto
        public string? Name { get; set; }

        // preço do produto
        public decimal Price { get; set; }
    }
}
