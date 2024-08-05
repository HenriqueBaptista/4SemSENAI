using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculos
{
    public static class Calculo
    {
        public static double Somar(double x, double y)
        {
            return x + y;
        }

        public static double Subtrair(double x, double y)
        {
            return x - y;
        }

        public static double Multiplicar(double x, double y)
        {
            return x * y;
        }

        public static double Dividir(double x, double y)
        {
            return x / y;
        }

        public static double Media(double x, double y)
        {
            return (x + y) / 2;
        }

        public static double Potenciacao(double x, double y)
        {
            return Math.Pow(x, y);
        }

        public static double Radiciacao(double x, double y)
        {
            return Math.Pow(x, (1 / y));
        }

        public static (double, double) Bhaskara(double a, double b, double c)
        {
           var delta = Math.Pow(b, 2) - (4 * (a * c));

            var x1 = ((b * -1) + Math.Sqrt(delta)) / (2 * a);
            var x2 = ((b * -1) - Math.Sqrt(delta)) / (2 * a);

            return (x1, x2);
        }
    }
}
