import type { Order, Entry } from '../domain/production';
const seed:Order[]=[
{id:'000142',product:'Tampa plástica 250 ml',code:'PA-00128',sector:'Injeção',machine:'Injetora 01',planned:5000,produced:3250,scrap:32,due:'2026-11-16',status:'Em produção',priority:true},
{id:'000143',product:'Frasco PEAD 500 ml',code:'PA-00204',sector:'Sopro',machine:'Sopradora 02',planned:8000,produced:2800,scrap:48,due:'2026-11-17',status:'Em produção',priority:false},
{id:'000144',product:'Pote transparente 1 L',code:'PA-00315',sector:'Injeção',machine:'Injetora 03',planned:3000,produced:2160,scrap:15,due:'2026-11-16',status:'Em produção',priority:false},
{id:'000145',product:'Alça de embalagem',code:'PA-00402',sector:'Montagem',machine:'Linha 01',planned:6000,produced:900,scrap:8,due:'2026-11-18',status:'Pausada',priority:false},
{id:'000146',product:'Bandeja organizadora',code:'PA-00516',sector:'Injeção',machine:'Injetora 02',planned:2400,produced:1080,scrap:24,due:'2026-11-18',status:'Em produção',priority:true},
{id:'000147',product:'Garrafa PEAD 1 L',code:'PA-00608',sector:'Sopro',machine:'Sopradora 01',planned:4500,produced:810,scrap:12,due:'2026-11-19',status:'Em produção',priority:false}];
export interface Database { orders:Order[]; entries:Entry[] }
export const repository={load():Database {try {const value=localStorage.getItem('op-control-v1'); if(value)return JSON.parse(value);}catch{} return {orders:structuredClone(seed),entries:[]};},save(data:Database){localStorage.setItem('op-control-v1',JSON.stringify(data));}};
