// CSS
import "./CurrencyConverter.css";

// STATES
import { useState, useEffect } from "react";

// AXIOS
import axios from "axios";




const CurrencyConverter = () => {
    const [rates,setRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
      
      axios.get("https://v6.exchangerate-api.com/v6/0601f389f51ff65b64ac65db/latest/USD")
      .then((response) => {
        setRates(response.data.conversion_rates);
      })
      .catch((error) => {
        console.log("Ocorreu um erro", error);
      })
    },[]);

    useEffect(() => {

      if(rates) {
        const rateFrom = rates[fromCurrency] || 0;
        const rateTo = rates[toCurrency] || 0;
        setConvertedAmount(((amount / rateFrom) * rateTo).toFixed(2));
      }
    }, [amount, rates, fromCurrency, toCurrency]
  );
   
  if(!rates) {
    return <h1>Carregando.....</h1>
  }

  return (
    <div className='converter caixa'>
        <h2>Currency converter</h2>
        <input type="number" placeholder='Digite o valor' value={amount}
        onChange={(e) => setAmount(e.target.value)}/>
        <span>Select the currency</span>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}> 
            {Object.keys(rates).map((currency) => (
              <option value={currency} key={currency}>{currency}
              </option>
            ))}
        </select>
        <span>to</span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {Object.keys(rates).map((currency) => (
              <option value={currency} key={currency}>{currency}
              </option>
            ))}
        </select>
        
        <h3>{convertedAmount} {toCurrency}</h3>
        <p>{amount} {fromCurrency} count {convertedAmount} {toCurrency} </p>
    </div>
  )
}

export default CurrencyConverter