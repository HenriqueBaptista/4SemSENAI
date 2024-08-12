// Crie uma função que recebe um número como parâmetro e retorna a tabuada desse número até o número 10. Utilize um laço for para gerar os múltiplos do número.

Console.WriteLine($"Escreva um número:");
var numero = int.Parse(Console.ReadLine()!);

for (int i = 1; i <= 10; i++)
{
    Console.WriteLine($"{numero} x {i} = {numero * i}");
}