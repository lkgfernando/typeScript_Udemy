/*-----------------------------------------*
| Tipagem de dados - Pârametros de Funções |
*-----------------------------------------*/

function saudar(nome: string): void {
    console.log(`Olá, ${nome}!`);
}

saudar("Fernando");

// Multiplos parâmetros
function calcularDesconto(valor: number, desconto: number): number {
    return valor - (valor * desconto / 100);
}

const valorFinal = calcularDesconto(100, 10);
console.log(valorFinal);

// Parâmetros opcionais
function registrarLog(mensagem: string, nivel?: string): void {
    const nivelFinal = nivel || "INFO"
    console.log(`[${nivelFinal}] ${mensagem}`);
}

// Parâmetros valor padrão

function conectarBanco(host: string, porta: number = 1433, timeout: number = 5000): void {
    console.log(`Conectado em ${host}:${porta} (timeout: ${timeout}ms)`);
}

conectarBanco("localhost"); // Usa porta 1433 e timeout 5000
conectarBanco("10.0.0.5", 1521); // Usa timeout 5000
conectarBanco("192.168.1.10", 3306, 10000); // todos customizados


//Union Types em Parâmetros
function buscarRegistro(id: string | number): void {
    console.log(`Buscando registro com ID: ${id}`);
}

buscarRegistro(123);
buscarRegistro("ABC");
//buscaRegistro(true) // ERRO

// Parâmetros com Objetos
function criarUsuario(nome: string, email: string, idade: number): void {
    console.log(`Criando usuário: ${nome}, ${email}, ${idade}`);
}

//Melhor abordagem: usar objeto
function criarUsuarioV2(dados: { nome: string, email: string, idade: number}): void {
    console.log(`Criando usuário: ${dados.nome}`);
}

criarUsuarioV2({
    nome: "Fernando",
    email: "lkgfernando@klsolutions.com",
    idade: 41
});






