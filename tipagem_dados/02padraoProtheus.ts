/*----------------------------------------*
| Configuração de ambiente Protheus       |
-----------------------------------------*/
let ambiente: string = "producao"
let porta: number = 8080;
let active: boolean = true;
let timeout: number = 30000;

// Status de processo
let statusProcesso: "executando" | "concluido" | "erro" | "aguardando";
statusProcesso = "executando";

let registroId: string | number = "ERP001";
registroId = 12345; // Regidtro Id também aceita número

