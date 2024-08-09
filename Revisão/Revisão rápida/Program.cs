Console.Clear();

//// Exercício 1 - Implementar um programa que recebe a nota de um aluno e imprime se ele está aprovado, reprovado ou em recuperação
double boletim1 = 5.4;
double boletim2 = 6;
double boletim3 = 10;
double media = 6;
void ImprimeResultado(double boletim)
{
    if (boletim > media)
    {
        Console.WriteLine($"Aluno Aprovado");
        Console.WriteLine($"");
    }
    else if (boletim == media)
    {
        Console.WriteLine($"Aluno de Recuperação");
        Console.WriteLine($"");
    }
    else
    {
        Console.WriteLine($"Aluno Reprovado");
        Console.WriteLine($"");
    }
}
Console.WriteLine($"----------");
Console.WriteLine($"Atividade 1");
Console.WriteLine($"Boletins escolares:");
Console.WriteLine($"");
ImprimeResultado(boletim1);
ImprimeResultado(boletim2);
ImprimeResultado(boletim3);
Console.WriteLine($"------------");


//// Exercício 2 - Implementar um programa que solicita ao usuário um número e imprime a tabuada desse número
Console.WriteLine($"----------");
Console.WriteLine($"Atividade 2");
Console.WriteLine($"Digite um número para sua tabuada:");
int numero = int.Parse(Console.ReadLine()!);
void ImprimeTabuada(int value)
{
    for (int i = 1; i <= 10; i++)
    {
        Console.WriteLine($"{value} x {i} = {value * i}");
    }
}
Console.WriteLine($"");
ImprimeTabuada(numero);
Console.WriteLine($"------------");


//// Exercício 3 - Calcular a soma dos números pares de 1 a 100
int numeroUmCem = 0;
int contador = 0;
Console.WriteLine($"----------");
Console.WriteLine($"Atividade 3");
Console.WriteLine($"Soma de 1 a 100:");
while (numeroUmCem < 100)
{
    if (numeroUmCem == 0)
        Console.WriteLine(numeroUmCem);

    numeroUmCem = numeroUmCem + 2;

    Console.WriteLine($"+ {numeroUmCem}");

    contador = contador + numeroUmCem;
}
Console.WriteLine($"O resultado da soma é igual a {contador}");


//// Exercício 4 - Crie um programa que gere um número aleatório entre 1 e 100. O usuário deve tentar adivinhar esse número. O programa deve continuar pedindo um palpite até que o usuário acerte o número. Ao final, mostre quantas tentativas foram necessárias.
bool avancar = false;
var numeroEscolhido = Random.Shared.Next(1, 100);
int tentativas = 0;
Console.WriteLine($"----------");
Console.WriteLine($"Atividade 4");
Console.WriteLine($"Adivinhe o número de 1 a 100:");
Console.WriteLine($"");
do
{
    tentativas++;

    int numeroDigitado = int.Parse(Console.ReadLine()!);

    if (numeroDigitado == numeroEscolhido)
    {
        avancar = true;

        Console.WriteLine($"Você acertou!!");
        Console.WriteLine($"Você precisou de {tentativas} tentativa(s)");

        Console.WriteLine($"Aperte enter para continuar");
        Console.ReadLine();
    }
    else if (numeroDigitado < numeroEscolhido)
    {
        Console.WriteLine($"");
        Console.WriteLine($"O número é maior do que o número que você escolheu, tente novamente!");
        Console.WriteLine($"");
    }
    else
    {
        Console.WriteLine($"");
        Console.WriteLine($"O número é menor do que o número que você escolheu, tente novamente!");
        Console.WriteLine($"");
    }
} while (avancar == false);
Console.WriteLine($"------------");


//// Exercício 5 - Você vai criar um programa que armazena as notas de vários alunos em diferentes disciplinas. O programa deve calcular a média de cada aluno e determinar quais alunos têm médias acima de 7.0 (aprovados) e quais têm médias abaixo de 7.0 (reprovados). O programa deve usar foreach para iterar sobre as coleções de alunos e suas notas.
/// Especificações:
/// - Armazene as notas de 3 disciplinas para cada aluno.
/// - Calcule a média de cada aluno.
/// - Exiba a média e o status (aprovado/reprovado) de cada aluno.
/// - Use foreach para iterar sobre os alunos e as disciplinas.
Console.WriteLine($"----------");
Console.WriteLine($"Atividade 5");
Console.WriteLine($"Notas de vários alunos:");
Console.WriteLine($"");
double mediaMinima = 7.0;
var Aluno1 = new Aluno
{
    Nota1 = 10,
    Nota2 = 8,
    Nota3 = 10
};
var Aluno2 = new Aluno
{
    Nota1 = 1,
    Nota2 = 7,
    Nota3 = 10
};
var Aluno3 = new Aluno
{
    Nota1 = 7,
    Nota2 = 7,
    Nota3 = 7
};
var Aluno4 = new Aluno
{
    Nota1 = 6,
    Nota2 = 6,
    Nota3 = 5
};
var AlunoPlatina = new Aluno {
    Nota1 = 10,
    Nota2 = 10,
    Nota3 = 10
};
var ListaAlunos = new List<Aluno>();
ListaAlunos.Add(Aluno1);
ListaAlunos.Add(Aluno2);
ListaAlunos.Add(Aluno3);
ListaAlunos.Add(Aluno4);
ListaAlunos.Add(AlunoPlatina);
foreach (var aluno in ListaAlunos)
{
    var mediaTudo = (aluno.Nota1 + aluno.Nota2 + aluno.Nota3) / 3;

    if (mediaTudo == 10)
    {
        aluno.status = "MALUCO PLATINOU A NOTA";

        Console.WriteLine(aluno.status + " :O");
        Console.WriteLine($"Média: {Math.Round(mediaTudo, 1)}");
        Console.WriteLine($"");
    }
    else if (mediaTudo >= mediaMinima)
    {
        aluno.status = "Aluno Aprovado!";

        Console.WriteLine(aluno.status + " :)");
        Console.WriteLine($"Média: {Math.Round(mediaTudo, 1)}");
        Console.WriteLine($"");
    }
    else {
        aluno.status = "Aluno Reprovado!";

        Console.WriteLine(aluno.status + " :(");
        Console.WriteLine($"Média: {Math.Round(mediaTudo, 1)}");
        Console.WriteLine($"");
    }
}