import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import abi from './SmartPizzaABI.json';
import './DettaglioPizza.css';
import { useLocation } from 'react-router-dom';

let web3;
let contract;

function DettaglioPizza() {
  const location = useLocation();
  const [pizzaDetail, setPizzaDetail] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
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

    const fetchPizzaDetail = async () => {
      try {
        await initWeb3();
        const orderId = location.state.orderId;
        const pizza = await contract.methods.getPizzaByOrderId(orderId).call();
        setPizzaDetail(pizza);
      } catch (error) {
        console.error('Error fetching pizza detail:', error);
      }
    };

    fetchPizzaDetail();
  }, [location]);

  return (
    <div className="container">
      <div className="divStyle">
        <h1>Dettagli Pizza</h1>
        {pizzaDetail ? (
          <table className="tableStyle">
            <thead>
              <tr>
                <th className="th">Ingredienti</th>
                <th className="th">Ambiente</th>
                <th className="th">Umidità</th>
                <th className="th">1° Lievitazione</th>
                <th className="th">2° Lievitazione</th>
                <th className="th">Temp. Platea</th>
                <th className="th">Temp. Forno</th>
                <th className="th">Cottura (s)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td">
                  {pizzaDetail.ingredients.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                  ))}
                </td>
                <td className="td">{pizzaDetail.tAmbiente} °C</td>
                <td className="td">{pizzaDetail.umidita} %</td>
                <td className="td">{pizzaDetail.lievitazione1} min</td>
                <td className="td">{pizzaDetail.lievitazione2} min</td>
                <td className="td">{pizzaDetail.tPlatea} °C</td>
                <td className="td">{pizzaDetail.tForno} °C</td>
                <td className="td">{pizzaDetail.time} sec</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Caricamento in corso...</p>
        )}
      </div>
      {/* Aggiungi il div per le spiegazioni sugli ingredienti */}
      <div className="ingredientsExplanation">
      <h2>Origine degli Ingredienti</h2>
      <h7>(Esempio)</h7>    
      <p>
        Il nostro ristorante si impegna a utilizzare ingredienti di alta qualità provenienti
        da fonti affidabili. Ecco un breve riassunto dell'origine degli ingredienti principali:
      </p>
      <ul>
        <li>
          <strong>Olio:</strong> Il nostro olio extra vergine di oliva proviene dalle migliori
          olive coltivate nelle colline dell'Italia.
        </li>
        <li>
          <strong>Farina:</strong> Utilizziamo farina biologica, macinata da grano coltivato in
          campi locali, per garantire la massima freschezza.
        </li>
        <li>
          <strong>Mozzarella:</strong> La mozzarella fresca viene preparata giornalmente utilizzando
          il latte fresco proveniente da mucche locali.
        </li>
        <li>
          <strong>Pomodoro:</strong> Il nostro pomodoro maturato al sole viene raccolto direttamente
          dalle nostre coltivazioni di pomodori in Italia.
        </li>
      </ul>
      <p>
        Siamo orgogliosi di offrire ai nostri clienti una pizza di alta qualità con ingredienti
        selezionati con cura e provenienti da fonti affidabili.
      </p>
    </div>
  </div>
);
}

export default DettaglioPizza;

