// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import React, { useEffect, useState } from "react";

import "./index";

const style = {
  width: "200px",
  height: "30px",
  display: "block",
  width: "59%",
  height: "40px",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "10px",
};

const style1 = {
  width: "100px",
  height: "30px",
  display: "block",
  width: "60%",
  height: "40px",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "10px",
};

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [fullForms, setFullForms] = useState([]);

  const [output, setOutput] = useState("");

  useEffect(
    function () {
      async function convert() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );

        const data = await res.json();

        if (fromCurrency === toCurrency) return setOutput(amount);

        setOutput(data.rates[toCurrency]);
      }

      convert();
    },
    [amount, fromCurrency, toCurrency]
  );

  useEffect(function () {
    async function currencies() {
      const res = await fetch(`https://api.frankfurter.app/currencies`);
      const data = await res.json();
      const allCurrenciesKeys = Object.keys(data);
      const allCurrenciesValues = Object.values(data);
      setCurrencies(allCurrenciesKeys);
      setFullForms(allCurrenciesValues);
    }
    currencies();
  }, []);

  return (
    <div className="App">
      <div className="main">
        <div className="center">
          <p style={{ fontSize: "30px", textAlign: "center" }}>
            💰️Currency Converter🤑
          </p>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            style={style}
          />
          <select
            style={style1}
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
            }}
          >
            {/* <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option> */}

            {currencies.map((cur, i) => (
              <Currency key={i} value={cur} fullForm={fullForms[i]} />
            ))}
          </select>
          <select
            style={style1}
            value={toCurrency}
            onChange={(e) => {
              setToCurrency(e.target.value);
            }}
          >
            {currencies.map((cur, i) => (
              <Currency key={i + 1} value={cur} fullForm={fullForms[i]} />
            ))}
          </select>
          <p style={{ fontSize: "30px", textAlign: "center" }}>{`${output} ${
            output && toCurrency
          }`}</p>
        </div>
      </div>
    </div>
  );
}

function Currency({ value, fullForm }) {
  return <option value={value}>{`${fullForm}(${value})`}</option>;
}
