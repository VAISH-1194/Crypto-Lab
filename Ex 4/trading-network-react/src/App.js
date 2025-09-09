// src/App.js
import React, { useState } from "react";
import FabricNetwork from "./components/FabricNetwork";
import "./styles.css";

const fabric = new FabricNetwork();
fabric.createChannel("cards-channel");
fabric.deployChaincode("cards-trading-network");
fabric.registerTrader("admin", "NetworkAdmin");

function App() {
  const [traders, setTraders] = useState(fabric.listTraders());
  const [cards, setCards] = useState(fabric.listCards());
  const [logs, setLogs] = useState(fabric.getLogs());
  const [msg, setMsg] = useState("");

  const addTrader = (id, name) => {
    const res = fabric.registerTrader(id, name);
    setTraders([...fabric.listTraders()]);
    setLogs([...fabric.getLogs()]);
    setMsg(res);
  };

  const addCard = (id, type, owner, forTrade) => {
    const res = fabric.createCard(id, type, owner, forTrade);
    setCards([...fabric.listCards()]);
    setLogs([...fabric.getLogs()]);
    setMsg(res);
  };

  const tradeCard = (id, newOwner) => {
    const res = fabric.submitTrade(id, newOwner);
    setCards([...fabric.listCards()]);
    setLogs([...fabric.getLogs()]);
    setMsg(res);
  };

  return (
    <div className="app">
      <h1> Trading Network Simulation </h1>
      <p>{msg}</p>

      <div className="card">
        <h2>Register Trader</h2>
        <input id="tid" placeholder="Trader ID" />
        <input id="tname" placeholder="Trader Name" />
        <button
          onClick={() =>
            addTrader(
              document.getElementById("tid").value,
              document.getElementById("tname").value
            )
          }
        >
          Register
        </button>
      </div>

      <div className="card">
        <h2>Create Card</h2>
        <input id="cid" placeholder="Card ID" />
        <input id="ctype" placeholder="Type (BASEBALL/FOOTBALL...)" />
        <input id="cowner" placeholder="Owner ID" />
        <input id="cft" placeholder="For Trade? yes/no" />
        <button
          onClick={() =>
            addCard(
              document.getElementById("cid").value,
              document.getElementById("ctype").value,
              document.getElementById("cowner").value,
              document.getElementById("cft").value.toLowerCase() === "yes"
            )
          }
        >
          Create
        </button>
      </div>

      <div className="card">
        <h2>Submit Trade</h2>
        <input id="tradeCard" placeholder="Card ID" />
        <input id="newOwner" placeholder="New Owner ID" />
        <button
          onClick={() =>
            tradeCard(
              document.getElementById("tradeCard").value,
              document.getElementById("newOwner").value
            )
          }
        >
          Trade
        </button>
      </div>

      <div className="card">
        <h2>Traders</h2>
        <ul>
          {traders.map((t) => (
            <li key={t.id}>{t.id} → {t.name}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Cards</h2>
        <ul>
          {cards.map((c) => (
            <li key={c.cardId}>
              {c.cardId} → {c.type} | owner={c.ownerId} | forTrade={c.forTrade ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Logs</h2>
        <ul>
          {logs.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
