// src/components/AppRouter.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CustomNavbar from './Navbar';
import Home from './Home';
import Partner from './Partner';
import AggiungiPizza from './AggiungiPizza'; // Importa il componente AggiungiPizza
import ListaPizze from './ListaPizze'; // Importa il componente ListaPizze

function AppRouter() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/aggiungi-pizza" element={<AggiungiPizza />} /> {/* Aggiungi la route per AggiungiPizza */}
        <Route path="/lista-pizze" element={<ListaPizze />} /> {/* Aggiungi la route per ListaPizze */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
