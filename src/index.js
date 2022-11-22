import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculadora from './pages/calculadora';
import Home from './pages/home';
import ControleFinanceiro from './pages/financas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/calculadora' element={<Calculadora/>}/>
      <Route path='/financeiro' element={<ControleFinanceiro/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


