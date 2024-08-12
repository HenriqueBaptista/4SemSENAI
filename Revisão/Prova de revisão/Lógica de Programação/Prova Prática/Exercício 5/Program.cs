// Crie um programa que peça ao usuário para digitar um texto e conte quantas vezes cada letra do alfabeto aparece no texto.

Console.Write("Escreva qualquer coisa: ");
string texto = Console.ReadLine()!;

char[] alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
int[] aparicaoDeLetras = new int[26];

char[] caracteres = texto.ToCharArray(0, texto.Length);

for (int textCharIndex = 0; textCharIndex < caracteres.Length; textCharIndex++)
{
    string caractereAtual = caracteres[textCharIndex].ToString();

    for (int indexDeLetra = 0; indexDeLetra < alfabeto.Length; indexDeLetra++)
    {
        string letraDoAlfabetoAtual = alfabeto[indexDeLetra].ToString();
    
        if (caractereAtual.Equals(letraDoAlfabetoAtual, StringComparison.InvariantCultureIgnoreCase)) 
        {
            aparicaoDeLetras[indexDeLetra]++;
            break;
        }
    }
}

Console.WriteLine("Ocorrências por letra do alfabeto: ");
for (int i = 0; i < aparicaoDeLetras.Length; i++)
{
    System.Console.WriteLine($"{Char.ToUpper(alfabeto[i])} - {aparicaoDeLetras[i]}");
}