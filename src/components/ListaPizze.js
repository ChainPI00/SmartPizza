import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import abi from './SmartPizzaABI.json'; 

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

      const address = '0x060CE771410981a2ea21bA830026f8F15CCfC001'; // Sostituisci con l'indirizzo del tuo contratto
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

  const fetchPizzaDetail = async () => {
    try {
      const pizza = await contract.methods.getPizzaByOrderId(orderId).call();
      setPizzaDetail(pizza);
    } catch (error) {
      console.error('Error fetching pizza detail:', error);
    }
  };

  return (
    <div style={style.container}>
      <div style={style.divStyle}>
        <h1>Ricerca Pizza</h1>
        <input 
          type="text" 
          value={orderId} 
          onChange={(e) => setOrderId(e.target.value)} 
          placeholder="Inserisci ID dell'ordine" 
          style={style.inputStyle}
        />
        <button onClick={fetchPizzaDetail} style={style.buttonStyle}>Ricerca</button>
        {pizzaDetail && (
          <table style={style.tableStyle}>
            <thead>
              <tr>
                <th style={style.th}>Ingredienti</th>
                <th style={style.th}>Ambiente</th>
                <th style={style.th}>Umidità</th>
                <th style={style.th}>1° Lievitazione</th>
                <th style={style.th}>2° Lievitazione</th>
                <th style={style.th}>Temp. Platea</th>
                <th style={style.th}>Temp. Forno</th>
                <th style={style.th}>Cottura (s)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={style.td}>
                     {pizzaDetail.ingredients.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                     ))}
                </td>
                <td style={style.td}>{pizzaDetail.tAmbiente} °C</td>
                <td style={style.td}>{pizzaDetail.umidita} %</td>
                <td style={style.td}>{pizzaDetail.lievitazione1} min</td>
                <td style={style.td}>{pizzaDetail.lievitazione2} min</td>
                <td style={style.td}>{pizzaDetail.tPlatea} °C</td>
                <td style={style.td}>{pizzaDetail.tForno} °C</td>
                <td style={style.td}>{pizzaDetail.time} sec</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div style={style.divStyle}>
        <h1>Tutte le Pizze</h1>
        <table style={style.tableStyle}>
          <thead>
            <tr>
              <th style={style.th}>Numero Ordine</th>
              <th style={style.th}>Ingredienti</th>
              <th style={style.th}>Ambiente</th>
              <th style={style.th}>Umidità</th>
              <th style={style.th}>1° Lievitazione</th>
              <th style={style.th}>2° Lievitazione</th>
              <th style={style.th}>Temp. Platea</th>
              <th style={style.th}>Temp. Forno</th>
              <th style={style.th}>Cottura (s)</th>
            </tr>
          </thead>
          <tbody>
            {pizze.map((pizza, index) => (
              <tr key={pizza.orderId}>
                <td style={style.td}>{index + 1}</td>
                <td style={style.td}>
                  {pizza.ingredients.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                  ))}
                </td>
                <td style={style.td}>{pizza.tAmbiente} °C</td>
                <td style={style.td}>{pizza.umidita} %</td>
                <td style={style.td}>{pizza.lievitazione1} min</td>
                <td style={style.td}>{pizza.lievitazione2} min</td>
                <td style={style.td}>{pizza.tPlatea} °C</td>
                <td style={style.td}>{pizza.tForno} °C</td>
                <td style={style.td}>{pizza.time} sec</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const style = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    flexWrap: 'wrap',
  },
  divStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    color: 'white',
    margin: '10px 0',
    '@media(min-width: 600px)': {
      width: '45%',
    },
  },
  inputStyle: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
  },
  buttonStyle: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  tableStyle: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    color: 'black',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
};

export default ListaPizze;
