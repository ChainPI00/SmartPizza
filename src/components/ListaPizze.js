// src/components/ListaPizze.js

import React, { useState, useEffect } from 'react';

function ListaPizze() {
  // Definisci uno stato per la lista delle pizze
  const [pizze, setPizze] = useState([]);

  // Simula il recupero della lista delle pizze (puoi sostituire questa parte con una chiamata API reale)
  useEffect(() => {
    // Simula il recupero della lista delle pizze
    const pizzaData = [
      { id: 1, nome: 'Pizza Margherita', ingredienti: 'Pomodoro, mozzarella, basilico', prezzo: '10.99' },
      { id: 2, nome: 'Pizza Pepperoni', ingredienti: 'Pomodoro, mozzarella, pepperoni', prezzo: '12.99' },
      // Aggiungi altre pizze
    ];
    setPizze(pizzaData);
  }, []);

  return (
    <div>
      <h1>Lista Pizze</h1>
      <ul>
        {pizze.map((pizza) => (
          <li key={pizza.id}>
            <h3>{pizza.nome}</h3>
            <p>Ingredienti: {pizza.ingredienti}</p>
            <p>Prezzo: {pizza.prezzo} Euro</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPizze;
