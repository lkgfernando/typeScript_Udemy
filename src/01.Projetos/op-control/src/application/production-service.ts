import { register, type Entry, type Status } from '../domain/production';
import { repository } from '../infrastructure/repository';
export class ProductionService {
 data=repository.load();
 point(id:string,type:Entry['type'],quantity:number,reason:string){const index=this.data.orders.findIndex(o=>o.id===id);if(index<0)throw Error('OP não encontrada.');const next=register(this.data.orders[index],type,quantity,reason);const updated={orders:this.data.orders.map((o,i)=>i===index?next:o),entries:[{id:crypto.randomUUID(),orderId:id,type,quantity,reason,at:new Date().toISOString()},...this.data.entries]};repository.save(updated);this.data=updated;}
 status(id:string,status:Status){const order=this.data.orders.find(o=>o.id===id);if(!order)throw Error('OP não encontrada.');if(order.status==='Concluída')throw Error('OP concluída não pode ser reaberta nesta versão.');if(status==='Concluída'&&order.produced+order.scrap<order.planned)throw Error('Existe saldo pendente de apontamento.');const updated={...this.data,orders:this.data.orders.map(o=>o.id===id?{...o,status}:o)};repository.save(updated);this.data=updated;}
}
