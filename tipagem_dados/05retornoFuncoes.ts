// Sintaxe básica

function somar(a: number, b: number): number {
    return a + b;
}

const resultado: number = somar(10,20); // 30

// Principais tipos de retorno
// 1 -- Number

function calcularTotal(preco: number, quantidade: number): number {
    return preco * quantidade;
}

const total = calcularTotal(100, 5); // 500

//2 -- String
function formatarCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

const cpfFormatado = formatarCPF("12345678901"); // "123.456.789-01"

// 3 -- Retornando boolean
function validarEmail(email: string): boolean {
    return email.includes("@") && email.includes(".");
}

const emailValido = validarEmail("fernando@exemplo.com") // true

// 4 -- Retonando Void (sem retorno)
//Use o void quando a função não retorna nada
function exibirMensagem(texto: string): void {
    console.log(texto);
}

exibirMensagem("Olá, Mundo!");


// 5 -- Retornando null ou undefined
function buscarUsuario(id: number): string | null {
    if(id > 0) {
        return "Fernanod";
    }
    return null // Não encontrado
}

const usuario = buscarUsuario(1); // "Fernando Rodrigues"
const naoEncontrado = buscarUsuario(-1); // null

// 6 -- Union Types Retorno
//Quando a função pode retornar mais de um tipo:
function dividir(a: number, b: number): number | string {
    if(b === 0){
        return "Erro: divisão por zero";
    }
    return a / b;

}

const resultado1 = dividir(10, 2); // 5
const resultado2 = dividir(10, 0); // "Erro: divisão por zero" (string)


// 7 -- Retornando Objetos
function buscarCliente(id: number): { nome: string, cpf: string } | null {
    if(id === 1) { 
        return {
            nome: "Fernando",
            cpf: "123.456.789-01"
        };
    }
    return null;
}

const cliente = buscarCliente(1); //
if(cliente) {
    console.log(cliente.nome); // "Fernando"
}

// 8 -- Retornando Array

function listarEmpresas(): string[]{
    return ["XPTO", "TOTVS", "Protheus"];
}

const empresas: string[] = listarEmpresas();

// 9 -- Tipo never - Funções que nunca Retorna

function lancarErro (mensagem: string): never {
   
    throw new Error(mensagem);
}

function loopInfinito(): never{
    while(true) {}

}

//-------------------------------------------------------------
// EXEMPLO PRÁTICO PROTHEUS
//-------------------------------------------------------------

function consultarClientes(codigo: string): {nome: string, cnpj: string} | null {
    
    if(codigo === "000001") {
        return {
            nome: "Cliente Exemplo LTDA",
            cnpj: "12.345.678/0001-90"
        };
    }

    return null
}

// Função para validar titulos financeiros

function validarTitulo(prefixo: string, numero: string): boolean {
    return prefixo.length > 0 && numero.length > 0;
}

// Função para calcula saldo

function calcularSaldo(debidos: number, credigos: number): number {
    return debidos - credigos;
}

// função que executa processo sem retorno

function sincronizarDados(tabela: string): void {
    console.log(`Sincronizando dados da tabela: ${tabela}`);
    //Processo de sincronização
}

// Função de múltiplos retornos possíveis

function processarPagamento(valor: number): "aprovado" | "recusado" | "pendente" {
    if(valor <= 0) return "recusado";
    if(valor > 1000) return "pendente";
    return "aprovado";
}

const statusPagamento = processarPagamento(500); // "aprovado"


// Type Guards - Trabalhando com Union Types

function buscarDados(id: number): string | number {
    return id > 0 ? "Dados encontrado" : 404;
}

const resultadoBusca = buscarDados(1);

// Type guard com typeof

if(typeof resultadoBusca === "string") {
    console.log(resultadoBusca.toUpperCase());
} else {
    console.log(resultadoBusca * 2);
}

 


