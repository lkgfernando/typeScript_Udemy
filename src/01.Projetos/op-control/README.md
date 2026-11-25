# OP Control
Aplicativo TypeScript + Vite, sem dependência de framework de UI.

## Executar
`npm install` e `npm run dev`. Build: `npm run build`.

## Acesso demonstrativo
Usuário `demo`, senha `Demo@123`. Trata-se apenas de uma simulação de login no cliente: não é autenticação para uso real. A hospedagem privada fornece uma barreira de acesso adicional. Não inserir dados sensíveis.

## Organização
- `src/domain`: entidades e regras de negócio puras.
- `src/application`: casos de uso e coordenação da persistência.
- `src/infrastructure`: repositório local, substituível por API.
- `src/presentation`: estilos.
- `src/main.ts`: interface, navegação e formulários.

## Regras
Apontamentos inteiros positivos; limite pelo saldo planejado menos produção e refugo; motivo obrigatório para refugo; apenas OP em produção pode receber registros; fechamento automático quando não há saldo; não reabre concluídas. Status não permite conclusão com saldo pendente. Produção e refugo são armazenados separadamente e juntos consomem o saldo planejado: validar essa convenção antes da integração ERP.

## Evolução
Extrair cada página de main.ts em módulos próprios conforme o crescimento. Substituir repositório por API de backend; autenticar e autorizar cada operação no servidor; armazenar usuário, filial e data do servidor; definir operações, unidades e regra de refugo com a equipe; garantir idempotência, transações e auditoria. Dados atuais fictícios sem integração com ERP, sem sincronização entre navegadores. Não implantar autenticação real com credenciais no bundle.
