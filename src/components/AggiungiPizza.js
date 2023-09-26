import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import abi from './SmartPizzaABI.json'; // Aggiungi il percorso corretto al tuo file ABI JSON


let web3;
let contract;

function AggiungiPizza() {
  const [pizzaInfo, setPizzaInfo] = useState({
    orderId: '',
    ingredients: '',
    tAmbiente: '',
    umidita: '',
    lievitazione1: '',
    lievitazione2: '',
    tPlatea: '',
    tForno: '',
    time: '',
  });

  const audioRef = useRef(); // Crea un riferimento all'elemento audio

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Aggiornato da ethereum.enable() a ethereum.request({ method: 'eth_requestAccounts' })
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          web3 = new Web3(window.ethereum);
        } catch (error) {
          console.error('User denied account access');
        }
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
  
      const address = '0x060CE771410981a2ea21bA830026f8F15CCfC001';
      contract = new web3.eth.Contract(abi, address);
    };

    initWeb3();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPizzaInfo({
      ...pizzaInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const accounts = await web3.eth.getAccounts();
      const ingredientsArray = pizzaInfo.ingredients.split(',').map(ingredient => ingredient.trim());
  
      // Creazione dell'oggetto pizzaInput
      const pizzaInput = {
        orderId: parseInt(pizzaInfo.orderId, 10),
        ingredients: ingredientsArray, // ora è un array di stringhe hex bytes32
        tAmbiente: parseInt(pizzaInfo.tAmbiente, 10),
        umidita: parseInt(pizzaInfo.umidita, 10),
        lievitazione1: parseInt(pizzaInfo.lievitazione1, 10),
        lievitazione2: parseInt(pizzaInfo.lievitazione2, 10),
        tPlatea: parseInt(pizzaInfo.tPlatea, 10),
        tForno: parseInt(pizzaInfo.tForno, 10),
        time: parseInt(pizzaInfo.time, 10),
    };
  
      // Log dell'oggetto pizzaInput per assicurarsi che sia nel formato corretto
      console.log('pizzaInput:', pizzaInput);
  
      // Chiamata alla funzione addPizza con l'oggetto pizzaInput
      await contract.methods.addPizza(
        pizzaInput.orderId,
        pizzaInput.ingredients,
        pizzaInput.tAmbiente,
        pizzaInput.umidita,
        pizzaInput.lievitazione1,
        pizzaInput.lievitazione2,
        pizzaInput.tPlatea,
        pizzaInput.tForno,
        pizzaInput.time
      ).send({ 
        from: accounts[0], 
        gas: 2100000, 
        gasPrice: '8000000000' 
      });
         
  
      console.log('Dati della pizza inviati:', pizzaInfo);
  
      setPizzaInfo({
        orderId: '',
        ingredients: '',
        tAmbiente: '',
        umidita: '',
        lievitazione1: '',
        lievitazione2: '',
        tPlatea: '',
        tForno: '',
        time: '',
      });
      audioRef.current.play();
    } catch (error) {
      console.error('Errore nell’invio dei dati:', error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ position: 'relative', display: 'flex' }}>
        <img
          src="/robotpizza1.png"
          alt="Robot Pizza"
          style={{ 
            width: '250px', 
            height: '250px', 
            position: 'absolute', 
            top: '330px', // Aggiusta la posizione dall'alto
            right: '470px', // Aggiusta la posizione da destra
          }}  
        />
        <img
          src="/robotpizza2.png"
          alt="Robot Pizza 2"
          style={{ 
            width: '100px', // Aggiusta la larghezza
            height: '100px', // Aggiusta l'altezza
            position: 'absolute', 
            top: '20px', // Aggiusta la posizione dall'alto
            right: '80px', // Aggiusta la posizione da destra
          }} 
        />
        <div
        style={{
          backgroundColor: '#ff303099',
          padding: '10px',
          borderRadius: '10px',
          maxWidth: '400px',
          margin: '20px',
          marginLeft: 'auto',
          marginRight: '100px',
          textAlign: 'center',
          marginTop: '60px', // Aggiunto un margine superiore di 30px
        }}
>


        <img
          src="/logo.png"
          alt="SmartPizza Logo"
          style={{
            marginBottom: '5px', // Ridotto il margine inferiore
            maxWidth: '200px',
          }}
        />

        {/* Sezione Informazioni Generali */}
        <div>
          <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="orderId" className="form-label" style={{ color: 'white', width: '180px' }}>Order ID</label>
            <input
              type="number"
              className="form-control"
              id="orderId"
              name="orderId"
              value={pizzaInfo.orderId}
              onChange={handleInputChange}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid white', width: '80px' }}
            />
          </div>
          <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="ingredients" className="form-label" style={{ color: 'white', width: '180px' }}>Ingredienti</label>
            <input
              type="text"
              className="form-control"
              id="ingredients"
              name="ingredients"
              value={pizzaInfo.ingredients}
              onChange={handleInputChange}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid white',
                width: '200px', // Modifica la larghezza del campo
                marginLeft: '20px', // Aggiungi un margine a sinistra
              }}
            />
          </div>
        </div>

        {/* Sezione Informazioni Ambientali */}
        <div>
          {/* Campi di input per Temperatura Ambiente, Umidità, Lievitazione */}
          <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="tAmbiente" className="form-label" style={{ color: 'white', width: '180px' }}>Temperatura Ambiente</label>
            <input
              type="number"
              className="form-control"
              id="tAmbiente"
              name="tAmbiente"
              value={pizzaInfo.tAmbiente}
              onChange={handleInputChange}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid white', width: '80px' }}
            />
          </div>
          <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="umidita" className="form-label" style={{ color: 'white', width: '180px' }}>Umidità</label>
            <input
              type="number"
              className="form-control"
              id="umidita"
              name="umidita"
              value={pizzaInfo.umidita}
              onChange={handleInputChange}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid white', width: '80px' }}
            />
          </div>
          <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="lievitazione1" className="form-label" style={{ color: 'white', width: '180px' }}>1/2 Lievitazione</label>
            <input
              type="number"
              className="form-control"
              id="lievitazione1"
              name="lievitazione1"
              value={pizzaInfo.lievitazione1}
              onChange={handleInputChange}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid white', width: '80px', marginRight: '10px' }}
            />
            <input
              type="number"
              className="form-control"
              id="lievitazione2"
              name="lievitazione2"
              value={pizzaInfo.lievitazione2}
              onChange={handleInputChange}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid white', width: '80px' }}
            />
          </div>
        </div>

        {/* Sezione Informazioni di Cottura */}
        <div>
          {/* Campi di input per Temperatura Platea, Temperatura Forno, Tempo di Cottura */}
          <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="tPlatea" className="form-label" style={{ color: 'white', width: '180px' }}>Temperatura Platea</label>
            <input
              type="number"
              className="form-control"
              id="tPlatea"
              name="tPlatea"
              value={pizzaInfo.tPlatea}
              onChange={handleInputChange}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid white', width: '80px' }}
            />
          </div>
          <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="tForno" className="form-label" style={{ color: 'white', width: '180px' }}>Temperatura Forno</label>
            <input
              type="number"
              className="form-control"
              id="tForno"
              name="tForno"
              value={pizzaInfo.tForno}
              onChange={handleInputChange}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid white', width: '80px' }}
            />
          </div>
          <div className="mb-" style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="time" className="form-label" style={{ color: 'white', width: '180px' }}>Tempo di Cottura</label>
            <input
              type="number"
              className="form-control"
              id="time"
              name="time"
              value={pizzaInfo.time}
              onChange={handleInputChange}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid white', width: '80px' }}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-light" style={{ color: 'black', marginTop: '10px'  }}>Aggiungi Pizza</button>
      </div>
      </div>
      <audio ref={audioRef} src="/sound.mp3" preload="auto"></audio>
    </form>
  );
}

export default AggiungiPizza;

