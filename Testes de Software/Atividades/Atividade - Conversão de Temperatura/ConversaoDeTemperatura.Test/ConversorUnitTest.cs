namespace ConversaoDeTemperatura.Test
{
    public class ConversorUnitTest
    {
        [Fact]
        public void CelsiusMudouParaFahrenheit()
        {
            // act
            var celsius = 23;
            var fahrenheit = 73.4;

            // arrange
            var resultado = Conversor.ConverterCelsiusParaFahrenheit(celsius);

            // assert
            Assert.Equal(fahrenheit, resultado);
        }
    }
}