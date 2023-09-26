import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import QRCode from 'qrcode.react';
import abi from './SmartPizzaABI.json';
import './ListaPizze.css';
import { Link } from 'react-router-dom';

let web3;
let contract;

function ListaPizze() {
  const [pizze, setPizze] = useState([]);
  const [pizzaDetail, setPizzaDetail] = useState(null);
  const [orderId, setOrderId] = useState('');

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

    const fetchPizzas = async () => {
      try {
        await initWeb3();
        const pizzas = await contract.methods.getAllPizzas().call();
        setPizze(pizzas);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchPizzas();
  }, []);

  const fetchPizzaDetail = async (orderId) => {
    try {
      const pizza = await contract.methods.getPizzaByOrderId(orderId).call();
      setPizzaDetail(pizza);
    } catch (error) {
      console.error('Error fetching pizza detail:', error);
    }
  };

  return (
    <div className="container">
      <div className="divStyle">
        <h1 className="h1" style={{ fontFamily: 'Monaco' }}>Ricerca Pizza</h1>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Inserisci ID dell'ordine"
          className="inputStyle"
        />
        <button onClick={() => fetchPizzaDetail(orderId)} className="buttonStyle">Ricerca</button>
        {pizzaDetail && (
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
                <th className="th">QR Code</th>
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
                <td className="td">
                  <QRCode value={`Dati pizza: ${JSON.stringify(pizzaDetail)}`} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="divStyle">
        <h1 className="h1" style={{ fontFamily: 'Monaco' }}>Tutte le Pizze</h1>
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="th">Numero Ordine</th>
              <th className="th">Ingredienti</th>
              <th className="th">Ambiente</th>
              <th className="th">Umidità</th>
              <th className="th">1° Lievitazione</th>
              <th className="th">2° Lievitazione</th>
              <th className="th">Temp. Platea</th>
              <th className="th">Temp. Forno</th>
              <th className="th">Cottura (s)</th>
              <th className="th">QR Code</th>
            </tr>
          </thead>
          <tbody>
            {pizze.map((pizza, index) => (
              <tr key={pizza.orderId}>
                <td className="td">{index + 1}</td>
                <td className="td">
                  {pizza.ingredients.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                  ))}
                </td>
                <td className="td">{pizza.tAmbiente} °C</td>
                <td className="td">{pizza.umidita} %</td>
                <td className="td">{pizza.lievitazione1} min</td>
                <td className="td">{pizza.lievitazione2} min</td>
                <td className="td">{pizza.tPlatea} °C</td>
                <td className="td">{pizza.tForno} °C</td>
                <td className="td">{pizza.time} sec</td>
                <td className="td">
                  <Link to="/dettaglio-pizza" state={{ orderId: pizza.orderId }}>
                    <QRCode value={`Dati pizza: ${JSON.stringify(pizza)}`} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaPizze;
