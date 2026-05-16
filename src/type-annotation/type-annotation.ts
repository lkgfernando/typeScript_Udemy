//tipos básicos
let nome: string = 'Fernanod';
let idade: number = 25;
let programador: boolean = true;
let simbolo: symbol = Symbol('qualquer-simbolo');


//Arrays
let arrayDeNumeros: Array<number> = [1, 2, 3];
let arrayDeStrings: Array<string> = ['a', 'b', 'c'];
let arrayDeNumeros2: number[] = [1, 2, 3];
let arrayDeStrings2: string[] = ['a', 'b', 'c'];

//Objetos
let pessoa: {nome: string, idade: number, programador?: boolean} = {
    nome: 'Fernanod',
    idade: 25,
    programador: true,
}

// Funcoes

function soma(a: number, b: number): number {
    return a + b;
}

const soma2: (x: number, y: number) => number = (x, y) => x + y;

console.log('Hello Word!!')


