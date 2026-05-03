// Funções para conectar em abiente Protheus
function conectarProtheus(
    ambiente: string,
    porta: number,
    empresa: string,
    filial: string,
    usuario?: string,
): void {
    const user = usuario || "admin";
    console.log(`Conectando: ${ambiente}:${porta} | ${empresa}/${filial} | Usuário: ${user}}`);
}
conectarProtheus("producao", 8080, "01", "0101");
conectarProtheus("homologacao", 8081, "01","0102", "fernando.rodrigues");

function processarTitulo(
    prefixo: string,
    numero: string,
    parcela: string,
    valor: number,
    emissao: string
): boolean {
    console.log(`Processando: ${prefixo} ${numero}/${parcela} - R$ ${valor}`)
    return true;
}

// Consulta SQL com parâmetros tipados
function executarQuery(
    query: string,
    tabela: string,
    filtro?: string,
    limite: number = 100
): void {
    const sql = `${query} FROM ${tabela} ${filtro || ""} LIMIT ${limite}`;
    console.log(`Executando: ${sql}`);
}

executarQuery("SELECT * ", "SA1010");
executarQuery("SELECT * ", "SE1010", "WHERE E1_SALDO > 0", 50)