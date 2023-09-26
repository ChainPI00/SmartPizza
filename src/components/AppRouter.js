import React, { useState } from 'react'; // Importa useState da React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CustomNavbar from './Navbar';
import Home from './Home';
import Partner from './Partner';
import AggiungiPizza from './AggiungiPizza'; // Importa il componente AggiungiPizza
import ListaPizze from './ListaPizze'; // Importa il componente ListaPizze
import Document from './Documents'; // Importa il componente Document
import DettaglioPizza from './DettaglioPizza'; // Importa il componente DettaglioPizza

function AppRouter() {
  const [pizzaDetail, setPizzaDetail] = useState(null); // Inizializza pizzaDetail utilizzando useState

  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/aggiungi-pizza" element={<AggiungiPizza />} /> {/* Aggiungi la route per AggiungiPizza */}
        <Route path="/lista-pizze" element={<ListaPizze />} /> {/* Aggiungi la route per ListaPizze */}
        <Route path="/documents" element={<Document />} /> {/* Aggiungi la route per Document */}
        <Route path="/dettaglio-pizza" element={<DettaglioPizza pizza={pizzaDetail} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
