const RESTAURANT_API=import.meta.env.VITE_RESTAURANT_API_URL||'http://localhost:8081';
const MENU_API=import.meta.env.VITE_MENU_API_URL||'http://localhost:8082';
async function request(url){const res=await fetch(url);if(!res.ok)throw new Error(`Error ${res.status}: no se pudo completar la solicitud.`);return res.json()}
export const getRestaurants=()=>request(`${RESTAURANT_API}/api/v1/restaurantes`);
export const getRestaurant=(id)=>request(`${RESTAURANT_API}/api/v1/restaurantes/${encodeURIComponent(id)}`);
export const getMenu=(id)=>request(`${MENU_API}/api/v1/menus/${encodeURIComponent(id)}`);
