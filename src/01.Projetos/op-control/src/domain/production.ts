export type Status = "Em produção" | "Pausada" | "Concluída";
export interface Entry {
    id: string;
    orderId: string;
    type: "Produção" | "Refugo";
    quantity: number;
    reason: string;
    at: string;
}
export interface Order {
    id: string;
    product: string;
    code: string;
    sector: string;
    machine: string;
    planned: number;
    produced: number;
    scrap: number;
    due: string;
    status: Status;
    priority: boolean;
}
export function register(
    order: Order,
    type: Entry["type"],
    quantity: number,
    reason: string,
): Order {
    if (
        !Number.isFinite(quantity) ||
        quantity <= 0 ||
        !Number.isInteger(quantity)
    )
        throw Error("Informe uma quantidade inteira maior que zero.");
    if (order.status !== "Em produção")
        throw Error(
            "A OP precisa estar em produção para receber apontamentos.",
        );
    if (quantity > order.planned - order.produced - order.scrap)
        throw Error("Quantidade superior ao saldo disponível da OP.");
    if (type === "Refugo" && !reason.trim())
        throw Error("Selecione o motivo do refugo.");
    const result = {
        ...order,
        produced: order.produced + (type === "Produção" ? quantity : 0),
        scrap: order.scrap + (type === "Refugo" ? quantity : 0),
    };
    if (result.produced + result.scrap === result.planned)
        result.status = "Concluída";
    return result;
}
