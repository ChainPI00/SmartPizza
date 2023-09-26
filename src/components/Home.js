import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', minHeight: '70vh', padding: '80px' }}>
      {/* Div per l'immagine a sinistra */}
      <div style={{ position: 'absolute', top: '60%', left: '35%', transform: 'translate(-60%, -50%)' }}>
        <img src="/robothome.png" alt="Robothome" style={{ maxWidth: '350px' }} />
      </div>

      {/* Div esistente */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Colore di sfondo con 50% di trasparenza
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <img
          src="/logo.png"
          alt="SmartPizza Logo"
          style={{
            marginBottom: '0px',
            maxWidth: '300px',
          }}
        />

        {/* Nuova scritta "NEW PIZZA" in bianco con effetto luce */}
        <div style={{ 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: '30px', 
        margin: '120px 0 20px 0',
        textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff, 0 0 30px #fff',
      }}>
        NEW PIZZA
      </div>


        {/* Aggiungi il bottone "CLICK HERE" in grassetto e stile curvo */}
        <Link to="/aggiungi-pizza">
        <button 
  style={{ 
    backgroundColor: '#ff3030', 
    color: 'white', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '50px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    fontSize: '25px',
    textShadow: '2px 2px 2px black',
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
  }}
>
  CLICK HERE
</button>


        </Link>
      </div>
    </div>
  );
}

export default Home;
