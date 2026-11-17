import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Restaurants from './pages/Restaurants.jsx';
import RestaurantDetail from './pages/RestaurantDetail.jsx';
import './style.css';
export function App(){return <BrowserRouter><Routes><Route path="/" element={<Restaurants/>}/><Route path="/restaurantes/:id" element={<RestaurantDetail/>}/></Routes></BrowserRouter>}
const mount=document.getElementById('root');
if(mount)createRoot(mount).render(<React.StrictMode><App/></React.StrictMode>);
