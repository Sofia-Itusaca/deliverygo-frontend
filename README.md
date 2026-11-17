# DeliveryGo Frontend

React + Vite; consume las APIs independientes de restaurantes y menús.

## Especificaciones

Consulta la [documentación técnica y funcional](docs/README.md), con las 13 SPECs del sistema y los estados implementados/pendientes.

## Desarrollo

`cp .env.example .env`, `npm install`, `npm run dev`. Abre http://localhost:5173. Variables: `VITE_RESTAURANT_API_URL` y `VITE_MENU_API_URL`.

## Build

`npm run build`. `npm test` ejecuta Vitest. Docker sirve el build con Nginx en el puerto 8080; las URLs Vite se fijan en tiempo de build con argumentos Docker.
