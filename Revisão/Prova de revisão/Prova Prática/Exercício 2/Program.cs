// Crie um programa que permita que o usuário cadastre 5 nomes em um vetor. Após o cadastro, o programa deve imprimir na tela os nomes cadastrados em ordem alfabética. Utilize um laço for para o cadastro e um método de ordenação de sua preferência (por exemplo, bubble sort) para ordenar os nomes.

Console.Clear();

var nomes = new string[5];

for (int i = 0; i < 5; i++)
{
    if (i == 0)
        Console.WriteLine($"Escreva um nome");
    else
        Console.WriteLine($"Escreva outro nome");

    string nome = Console.ReadLine()!;
  
    Console.WriteLine($"");
}

Console.WriteLine(nomes.First());
