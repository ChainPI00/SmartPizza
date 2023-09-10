// src/components/Home.js

import React from 'react';

function Home() {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Colore di sfondo con 50% di trasparenza
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '40px auto 0',
        textAlign: 'center',
      }}
    >
      <img
        src="/SmartPizza.jpeg"
        alt="SmartPizza Logo"
        style={{
          marginBottom: '20px',
          maxWidth: '200px',
          borderRadius: '50%', // Imposta un bordo arrotondato al 50%
        }}
      />
      <b style={{ color: 'white' }}>
  
Il progetto SMART PIZZA nasce sulla visione di avere una piattaforma basata su blockchain concepita per introdurre un approccio innovativo all'insegnamento e all'apprendimento attraverso l'arte culinaria.
</b>

    </div>
  );
}

export default Home;
