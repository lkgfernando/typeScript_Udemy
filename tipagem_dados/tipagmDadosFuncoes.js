"use strict";
/*-----------------------------------------*
| Tipagem de dados - Pârametros de Funções |
*-----------------------------------------*/
function saudar(nome) {
    console.log(`Olá, ${nome}!`);
}
saudar("Fernando");
// Multiplos parâmetros
function calcularDesconto(valor, desconto) {
    return valor - (valor * desconto / 100);
}
const valorFinal = calcularDesconto(100, 10);
console.log(valorFinal);
// Parâmetros opcionais
function registrarLog(mensagem, nivel) {
    const nivelFinal = nivel || "INFO";
    console.log(`[${nivelFinal}] ${mensagem}`);
}
