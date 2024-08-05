using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculos.Test
{
    public class CalculoUnitTest
    {
        // principio AAA : Arrange, Act and Assert;
        // principio AAA : Organizar, Agir e Provar;
        [Fact]
        public void SomarDoisNumeros()
        {
            var n1 = 3.3;
            var n2 = 2.2;
            var valorEsperado = 5.5;

            var resultado = Calculo.Somar(n1, n2);

            Assert.Equal(valorEsperado, resultado, 0.001);
        }

        [Fact]
        public void SubtrairDoisNumeros()
        {
            var n1 = 3.3;
            var n2 = 2.2;
            var valorEsperado = 1.1;

            var resultado = Calculo.Subtrair(n1, n2);

            Assert.Equal(valorEsperado, resultado, 0.001);
        }

        [Fact]
        public void MultiplicarDoisNumeros()
        {
            var n1 = 2;
            var n2 = 10;
            var valorEsperado = 20;

            var resultado = Calculo.Multiplicar(n1, n2);

            Assert.Equal(valorEsperado, resultado, 0.001);
        }

        [Fact]
        public void DividirDoisNumeros()
        {
            var n1 = 10;
            var n2 = 2;
            var valorEsperado = 5;

            var resultado = Calculo.Dividir(n1, n2);

            Assert.Equal(valorEsperado, resultado, 0.001);
        }

        // operações adicionais
        [Fact]
        public void EncontrarMediaDoisNumeros()
        {
            var n1 = 4;
            var n2 = 8;
            var valorEsperado = 6;

            var resultado = Calculo.Media(n1, n2);

            Assert.Equal(valorEsperado, resultado, 0.001);
        }

        [Fact]
        public void PotencializarNumeros()
        {
            var n1 = 4;
            var n2 = 2;
            var valorEsperado = 16;

            var resultado = Calculo.Potenciacao(n1, n2);

            Assert.Equal(valorEsperado, resultado, 0.001);
        }

        [Fact]
        public void RadiciarNumeros()
        {
            var n1 = 121;
            var n2 = 2;
            var valorEsperado = 11;

            var resultado = Calculo.Radiciacao(n1, n2);

            Assert.Equal(valorEsperado, resultado, 0.001);
        }

        [Fact]
        public void EquacaoDeSegundoGrau()
        {
            var a = -2;
            var b = 1;
            var c = 3;
            var x1 = -1;
            var x2 = 1.5;

            var resultados = Calculo.Bhaskara(a, b, c);

            Assert.Equal(x1, resultados.Item1, 0.001);
            Assert.Equal(x2, resultados.Item2, 0.001);
        }
    }
}
