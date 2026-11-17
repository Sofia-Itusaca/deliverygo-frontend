import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './main.jsx';
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const ids=Array.from({length:6},(_,i)=>`10000000-0000-4000-8000-${String(i+1).padStart(12,'0')}`);
const restaurants=ids.map((id,i)=>({id,nombre:['Pollería El Buen Sabor','Pollería Brasas Doradas','Pollería La Leña','Chifa Dragón Dorado','Chifa Palacio Oriental','Chifa Gran Muralla'][i],categoria:i<3?'POLLERIA':'CHIFA',descripcion:'Sabor para compartir',direccion:'Lima, Perú',imagen_url:'https://example.com/food.jpg'}));
let root,container;
beforeEach(()=>{container=document.createElement('div');document.body.append(container);root=createRoot(container);vi.stubGlobal('fetch',vi.fn(async url=>({ok:true,json:async()=>String(url).includes('/restaurantes/')?restaurants[0]:String(url).includes('/menus/')?[{id:'dish-1',nombre:'Pollo a la brasa 1/8',categoria:'Pollo a la brasa',descripcion:'Con papas',precio:23.9,imagen_url:'https://example.com/dish.jpg',disponible:true}]:restaurants})))});
afterEach(async()=>{await act(async()=>root.unmount());container.remove();vi.unstubAllGlobals()});
describe('DeliveryGo',()=>{
 it('muestra seis restaurantes, filtra y busca por nombre',async()=>{await act(async()=>root.render(<App/>));expect(container.querySelectorAll('.restaurant-card')).toHaveLength(6);await act(async()=>container.querySelectorAll('.filters button')[1].click());expect(container.querySelectorAll('.restaurant-card')).toHaveLength(3);await act(async()=>{const input=container.querySelector('input');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'La Leña');input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}))});expect(container.querySelectorAll('.restaurant-card')).toHaveLength(1)});
 it('abre detalles y carga el menú por el identificador seleccionado',async()=>{await act(async()=>root.render(<App/>));await act(async()=>container.querySelector('.text-link').click());await new Promise(r=>setTimeout(r,0));await act(async()=>{});expect(container.textContent).toContain('Nuestro menú');expect(container.textContent).toContain('Pollo a la brasa 1/8');expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/v1/menus/'))});
});
