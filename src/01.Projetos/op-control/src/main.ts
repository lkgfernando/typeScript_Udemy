import "./presentation/styles.css";
import { ProductionService } from "./application/production-service";
import type { Order, Status } from "./domain/production";
const app = document.querySelector<HTMLDivElement>("#app")!;
const service = new ProductionService();
let page = "production",
    query = "",
    filter = "Todas",
    sector = "Todos";
const fmt = (n: number) => n.toLocaleString("pt-BR");
const esc = (s: string) =>
    s.replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c]!,
    );
const icon = (s: string) => `<span class="icon">${s}</span>`;
function login() {
    app.innerHTML = `<div class="login"><section class="login-story"><div class="brand">${icon("◈")} OP Control</div><div><span class="eyebrow">DO PLANEJAMENTO À ENTREGA</span><h1>Sua produção.<br>Em um só lugar.</h1><p>Acompanhe cada ordem, registre a produção e tenha mais clareza no chão de fábrica.</p><div class="mini"><span class="live"></span> Controle que acompanha o seu ritmo</div></div><small>OP CONTROL / GESTÃO DE PRODUÇÃO</small></section><section class="login-form"><form id="login"><span class="eyebrow">BEM-VINDO DE VOLTA</span><h2>Acesse sua operação</h2><p>Entre para acompanhar as ordens de produção.</p><label>Usuário<input name="user" autocomplete="username" required placeholder="Seu usuário"></label><label>Senha<input name="password" type="password" autocomplete="current-password" required placeholder="Sua senha"></label><p id="login-error" role="alert"></p><button class="primary">Entrar na plataforma →</button><div class="demo"><b>Ambiente de demonstração</b><br>Usuário: <strong>demo</strong> · Senha: <strong>Demo@123</strong><br>Dados fictícios, salvos somente neste navegador.</div></form></section></div>`;
    document.querySelector("#login")!.addEventListener("submit", (e) => {
        e.preventDefault();
        const d = new FormData(e.target as HTMLFormElement);
        if (d.get("user") === "demo" && d.get("password") === "Demo@123") {
            sessionStorage.setItem("op-demo-session", "1");
            render();
        } else
            document.querySelector("#login-error")!.textContent =
                "Usuário ou senha inválidos.";
    });
}
function card(o: Order) {
    const pct = Math.round((o.produced / o.planned) * 100);
    return `<article class="card"><div class="card-top"><span class="op">OP ${o.id}</span><span class="badge ${o.status === "Pausada" ? "paused" : o.status === "Concluída" ? "done" : ""}"><i></i>${o.status}</span></div><h3>${o.product}</h3><p class="code">${o.code} <span>•</span> ${o.sector}</p><div class="machine">▧ <span>${o.machine}</span>${o.priority ? '<span class="priority">↗ Prioridade alta</span>' : ""}</div><div class="progress-label"><span>Produção realizada</span><strong>${pct}%</strong></div><div class="track"><div style="width:${pct}%"></div></div><div class="quantities"><div><b>${fmt(o.produced)}</b><small>Produzidas</small></div><div><b>${fmt(o.planned)}</b><small>Planejadas</small></div><div><b class="scrap">${fmt(o.scrap)}</b><small>Refugo</small></div></div><div class="due">◷ Entrega prevista <strong>${new Date(o.due + "T12:00").toLocaleDateString("pt-BR")}</strong></div><div class="card-actions"><button data-action="view" data-id="${o.id}">◎ Visualizar OP</button><button data-action="status" data-id="${o.id}">◉ Status</button><button class="point" data-action="point" data-id="${o.id}" ${o.status !== "Em produção" ? "disabled" : ""}>＋ Apontar produção</button><button data-action="scrap" data-id="${o.id}" ${o.status !== "Em produção" ? "disabled" : ""}>↳ Apontar refugo</button></div></article>`;
}
function render() {
    if (!sessionStorage.getItem("op-demo-session")) return login();
    const orders = service.data.orders;
    const produced = orders.reduce((s, o) => s + o.produced, 0),
        scrap = orders.reduce((s, o) => s + o.scrap, 0);
    app.innerHTML = `<div class="shell"><aside><div class="brand">${icon("◈")} OP Control</div><div class="workspace"><div class="workspace-icon">F</div><div>Minha fábrica<small>Ambiente demonstrativo</small></div></div><div class="nav-label">OPERAÇÃO</div><nav><button data-page="production" class="${page === "production" ? "active" : ""}">▦ <span>OPs em produção</span><b>${orders.filter((o) => o.status === "Em produção").length}</b></button><button data-page="history" class="${page === "history" ? "active" : ""}">◷ <span>Apontamentos</span></button><button data-page="about" class="${page === "about" ? "active" : ""}">⚙ <span>Sobre o ambiente</span></button></nav><div class="aside-bottom"><div class="local"><span class="live"></span> Dados locais · Demonstração</div><button id="logout">↪ Sair da plataforma</button></div></aside><div class="main"><header><span>Operação <span class="slash">/</span> <b>${page === "production" ? "Ordens de produção" : page === "history" ? "Apontamentos" : "Sobre o ambiente"}</b></span><div class="user"><span class="avatar">OP</span><div>Operador demo<small>Controle de produção</small></div></div></header><main>${
        page === "production"
            ? `<div class="title-row"><div><span class="eyebrow">CONTROLE DE PRODUÇÃO</span><h1>OPs em produção<span class="title-dot">.</span></h1><p>Acompanhe o andamento e registre os resultados da sua operação.</p></div><span class="date">◷ ${new Date().toLocaleDateString("pt-BR")}</span></div><div class="metrics"><div><span>Ordens em produção</span><b>${orders
                  .filter((o) => o.status === "Em produção")
                  .length.toString()
                  .padStart(
                      2,
                      "0",
                  )}</b><small><i class="live"></i> Operação em andamento</small></div><div><span>Unidades produzidas</span><b>${fmt(produced)}</b><small>Acumulado das ordens</small></div><div><span>Ordens pausadas</span><b>${orders
                  .filter((o) => o.status === "Pausada")
                  .length.toString()
                  .padStart(
                      2,
                      "0",
                  )}</b><small>Aguardando retomada</small></div><div><span>Índice de refugo</span><b>${((scrap / (produced + scrap)) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}<em>%</em></b><small>${fmt(scrap)} unidades registradas</small></div></div><div class="section-heading"><h2>Ordens de produção <span>${orders.length}</span></h2><span>Visão em cards ▦</span></div><div class="filters"><div class="search">⌕ <input id="search" placeholder="Buscar OP, produto ou código..." value="${esc(query)}" aria-label="Buscar OP"></div><select id="status-filter" aria-label="Filtrar status">${["Todas", "Em produção", "Pausada", "Concluída"].map((s) => `<option ${s === filter ? "selected" : ""}>${s}</option>`).join("")}</select><select id="sector-filter" aria-label="Filtrar setor">${["Todos", "Injeção", "Sopro", "Montagem"].map((s) => `<option ${s === sector ? "selected" : ""} value="${s}">${s === "Todos" ? "Todos os setores" : s}</option>`).join("")}</select><button id="clear">Limpar filtros</button></div><div id="cards" class="cards"></div><div id="count" class="results"></div>`
            : page === "history"
              ? `<div class="title-row"><div><span class="eyebrow">RASTREABILIDADE</span><h1>Apontamentos<span class="title-dot">.</span></h1><p>Histórico de produção e refugo registrados neste navegador.</p></div></div>${service.data.entries.length ? `<div class="table-wrap"><table><thead><tr><th>Data e hora</th><th>OP</th><th>Tipo</th><th>Quantidade</th><th>Motivo</th></tr></thead><tbody>${service.data.entries.map((e) => `<tr><td>${new Date(e.at).toLocaleString("pt-BR")}</td><td>${e.orderId}</td><td>${e.type}</td><td>${fmt(e.quantity)}</td><td>${esc(e.reason) || "—"}</td></tr>`).join("")}</tbody></table></div>` : '<div class="empty">◷<h2>Nenhum apontamento ainda</h2><p>Registre produção ou refugo em uma OP para iniciar o histórico.</p><button class="primary" data-page="production">Ir para as OPs</button></div>'}`
              : `<div class="title-row"><div><span class="eyebrow">ESTRUTURA DO APLICATIVO</span><h1>Pronto para evoluir<span class="title-dot">.</span><p>Uma base em TypeScript com responsabilidades separadas.</p></div></div><section class="about"><h2>Ambiente de demonstração</h2><p>O acesso usa credenciais demonstrativas. Os registros ficam no armazenamento local deste navegador, sem sincronização entre usuários ou dispositivos. Nenhuma alteração é enviada ao Protheus.</p><h2>Organização do projeto</h2><p><b>domain/</b> — modelos, validações e regras de produção.<br><b>application/</b> — casos de uso de apontamento e status.<br><b>infrastructure/</b> — persistência, preparada para substituição por API.<br><b>presentation/</b> — estilos e interface; navegação em main.ts.</p><h2>Próxima etapa</h2><p>Conectar um backend com autenticação real, banco de dados e integração com as ordens de produção.</p></section>`
    }<footer>OP Control <span>Visibilidade para cada etapa da produção.</span><b>DEMONSTRAÇÃO · v1.0</b></footer></main></div></div><dialog id="modal"></dialog><div id="toast" role="status"></div>`;
    document.querySelectorAll<HTMLButtonElement>("[data-page]").forEach(
        (b) =>
            (b.onclick = () => {
                page = b.dataset.page!;
                render();
            }),
    );
    document.querySelector<HTMLButtonElement>("#logout")!.onclick = () => {
        sessionStorage.removeItem("op-demo-session");
        login();
    };
    if (page === "production") {
        drawCards();
        document.querySelector<HTMLInputElement>("#search")!.oninput = (e) => {
            query = (e.target as HTMLInputElement).value;
            drawCards();
        };
        document.querySelector<HTMLSelectElement>("#status-filter")!.onchange =
            (e) => {
                filter = (e.target as HTMLSelectElement).value;
                drawCards();
            };
        document.querySelector<HTMLSelectElement>("#sector-filter")!.onchange =
            (e) => {
                sector = (e.target as HTMLSelectElement).value;
                drawCards();
            };
        document.querySelector<HTMLButtonElement>("#clear")!.onclick = () => {
            query = "";
            filter = "Todas";
            sector = "Todos";
            render();
        };
    }
}
function drawCards() {
    const found = service.data.orders.filter(
        (o) =>
            (filter === "Todas" || o.status === filter) &&
            (sector === "Todos" || o.sector === sector) &&
            `${o.id} ${o.code} ${o.product}`
                .toLowerCase()
                .includes(query.toLowerCase()),
    );
    document.querySelector("#cards")!.innerHTML =
        found.map(card).join("") ||
        '<div class="empty">Nenhuma OP encontrada para os filtros selecionados.</div>';
    document.querySelector("#count")!.textContent =
        `Exibindo ${found.length} de ${service.data.orders.length} ordens de produção`;
    document
        .querySelectorAll<HTMLButtonElement>("[data-action]")
        .forEach(
            (b) =>
                (b.onclick = () => openModal(b.dataset.id!, b.dataset.action!)),
        );
}
function openModal(id: string, action: string) {
    const o = service.data.orders.find((o) => o.id === id)!;
    const modal = document.querySelector<HTMLDialogElement>("#modal")!;
    const title =
        action === "view"
            ? "Detalhes da OP"
            : action === "status"
              ? "Status da OP"
              : action === "point"
                ? "Apontar produção"
                : "Apontar refugo";
    modal.innerHTML = `<form id="modal-form"><div class="modal-head"><span class="eyebrow">OP ${o.id}</span><button type="button" id="close" aria-label="Fechar">×</button></div><h2>${title}</h2><p>${o.product} · ${o.code}</p>${action === "view" ? `<div class="details"><div>Setor<b>${o.sector}</b></div><div>Recurso<b>${o.machine}</b></div><div>Status<b>${o.status}</b></div><div>Quantidade planejada<b>${fmt(o.planned)} un.</b></div><div>Produção realizada<b>${fmt(o.produced)} un.</b></div><div>Refugo<b>${fmt(o.scrap)} un.</b></div><div>Saldo para apontar<b>${fmt(o.planned - o.produced - o.scrap)} un.</b></div></div>` : action === "status" ? `<label>Status<select name="status">${["Em produção", "Pausada", "Concluída"].map((s) => `<option ${s === o.status ? "selected" : ""}>${s}</option>`).join("")}</select></label><p class="hint">A conclusão exige que todo o saldo tenha sido apontado. OPs concluídas não podem ser reabertas.</p>` : `<div class="balance">Saldo disponível <b>${fmt(o.planned - o.produced - o.scrap)} un.</b></div><label>Quantidade (unidades)<input name="quantity" type="number" min="1" max="${o.planned - o.produced - o.scrap}" step="1" required placeholder="Informe a quantidade"></label>${action === "scrap" ? '<label>Motivo do refugo<select name="reason" required><option value="">Selecione o motivo</option><option>Falha de processo</option><option>Defeito de matéria-prima</option><option>Ajuste de máquina</option><option>Falha dimensional</option><option>Outros</option></select></label>' : ""}`}<p id="modal-error" role="alert"></p><div class="modal-footer"><button type="button" id="cancel">${action === "view" ? "Fechar" : "Cancelar"}</button>${action === "view" ? "" : '<button class="primary" type="submit">Confirmar registro</button>'}</div></form>`;
    modal.showModal();
    document.querySelector<HTMLButtonElement>("#close")!.onclick = () =>
        modal.close();
    document.querySelector<HTMLButtonElement>("#cancel")!.onclick = () =>
        modal.close();
    document.querySelector("#modal-form")!.addEventListener("submit", (e) => {
        e.preventDefault();
        if (action === "view") return;
        const d = new FormData(e.target as HTMLFormElement);
        try {
            if (action === "status")
                service.status(id, d.get("status") as Status);
            else
                service.point(
                    id,
                    action === "point" ? "Produção" : "Refugo",
                    Number(d.get("quantity")),
                    String(d.get("reason") || ""),
                );
            modal.close();
            render();
            const toast = document.querySelector("#toast")!;
            toast.textContent = "✓ Registro salvo com sucesso";
            setTimeout(() => (toast.textContent = ""), 3500);
        } catch (error) {
            document.querySelector("#modal-error")!.textContent = (
                error as Error
            ).message;
        }
    });
}
render();
