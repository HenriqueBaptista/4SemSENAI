using System.Net.Mail;
using ValidacaoDeEmail;
using Xunit;

namespace ValidacaoDeEmail.Test
{
    public static class Validacao
    {
        public static bool ValidarEmail(string email)
        {
            try
            {
                new MailAddress(email);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }

    public class EmailValidateUnitTest
    {
        [Theory]
        [InlineData("email@email.com", true)]
        [InlineData("wrong-user", false)]
        public void EmailFoiValidado(string email, bool resultadoEsperado)
        {
            var resultado = Validacao.ValidarEmail(email);

            Assert.Equal(resultadoEsperado, resultado);
        }
    }
}

// ** ficou assim porque estava dando erro na hora de referenciar o outro projeto.