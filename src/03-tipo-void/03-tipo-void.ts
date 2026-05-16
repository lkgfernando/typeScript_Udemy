function noReturn(...args: string[]): void {
    console.log(args.join(' '));
}

const pessoa = {
    name: 'Fernando',
    lastName: 'Rodrigues',

    displayName(): void {
        console.log(this.name + ' ' + this.lastName);
    },
};

noReturn('Kauan', 'Rodrigues');

pessoa.displayName();
