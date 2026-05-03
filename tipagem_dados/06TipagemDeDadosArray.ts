// Forma 1: tipo[]
let numeros: number[] = [1, 2, 3, 4, 5];
let nomes: string[] = ["João", "Maria", "Pedro"];

// Forma 2: Array <tipo>
let valores: Array<number> = [10, 20, 30, 40, 50];
let email: Array<string>   = ["email1@exemplo.com", "email2@exemplo.com"];

// Recomendação utilizar o tipo (forma 1 ) - é mais comum e legível

// Array tipos primitivos
let empresas: string[] = ["XPTO", "TOTVS", "Protheus"];
// Array de numeros
let portas: number[] = [8080, 8081, 8082];
// Array booleanos
let statusB: boolean[] = [true, false, true, false];


// Array String ou Numeros
let ids: (string | number)[] = ["1", "2", "3", "ABC", "XYZ"];

// Array multiplos tipos
let dados: (string | number | boolean)[] = ["Fernando", 41, true, 5500];

// *** Cuidado com a sintaxe (string | number)[] -> Array de strings ou números

// *** string | number[] -> String ou array de números(não é que você quer!)

// Array de Objetos
// -- Array inline
let usuarios: { nome: string, idade: number }[] = [
    { nome: "João", idade: 30 },
    { nome: "Maria", idade: 25 },
    { nome: "Pedro", idade: 35 }
];

//Acessando os dados
console.log(usuarios[0].nome); // João
console.log(usuarios[1].idade); // 25

// Array multidimensionais:
let matriz: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matriz[1][2]); // 6
console.log(matriz[2][0]); // 7

// Array de arrays de strings
let tabelas: string[][] = [
    ["SA1010", "SE1010", "SA2010", "SE2010"],
    ["SA3010", "SE3010", "SA4010", "SE4010"],
    ["SB1010", "SB2010", "SB3010", "SB4010"]
];

// Métodos Úteis de Arrays
let numeros1: number[] = [10, 20, 30, 40, 50];
// push - adiciona no final
numeros1.push(60) // [10,20,30,40,5,60]
// pop - remove do final
numeros1.pop() // [10,20,30,40,50]
// length - tamanho do array
console.log(numeros1.length); // 5
// find - encontra primeiro elemento que satisfaz condição
let encontrado = numeros1.find(n => n > 25); // 30
//filter - filtra elementos
let maioresQue20 = numeros1.filter(n => n > 20) //[30,40,50]
//map - transformar cada elemento
let dobrados = numeros1.map(n => n * 2); // [20,40,60,80,100]
//Includes - verifica se contém elemento
let contem30 = numeros1.includes(30); // true

