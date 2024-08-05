using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConversaoDeTemperatura
{
    public static class Conversor
    {
        public static double ConverterCelsiusParaFahrenheit(double celsius)
        {
            var fahrenheit = (celsius * 1.8) + 32;

            return fahrenheit;
        }
    }
}
