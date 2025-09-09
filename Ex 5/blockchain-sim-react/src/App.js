// src/App.js
import React, { useState } from "react";
import BlockchainNetwork from "./components/BlockchainNetwork";
import "./styles.css";

const blockchain = new BlockchainNetwork();

function App() {
  const [ledger, setLedger] = useState(blockchain.getLedger());
  const [logs, setLogs] = useState(blockchain.getLogs());
  const [msg, setMsg] = useState("");

  const createAsset = async () => {
    const id = document.getElementById("aid").value;
    const color = document.getElementById("acolor").value;
    const size = parseInt(document.getElementById("asize").value);
    const owner = document.getElementById("aowner").value;
    const value = parseInt(document.getElementById("avalue").value);

    const res = await blockchain.createAsset(id, color, size, owner, value);
    setLedger([...blockchain.getLedger()]);
    setLogs([...blockchain.getLogs()]);
    setMsg(res);
  };

  const queryAsset = () => {
    const id = document.getElementById("qid").value;
    const res = blockchain.queryAsset(id);
    setLogs([...blockchain.getLogs()]);
    setMsg(res);
  };

  const transferAsset = async () => {
    const id = document.getElementById("tid").value;
    const newOwner = document.getElementById("towner").value;
    const res = await blockchain.transferAsset(id, newOwner);
    setLedger([...blockchain.getLedger()]);
    setLogs([...blockchain.getLogs()]);
    setMsg(res);
  };

  return (
    <div className="app">
      <h1> Blockchain Network Simulation </h1>
      <p>{msg}</p>

      <div className="card">
        <h2>Create Asset</h2>
        <input id="aid" placeholder="Asset ID" />
        <input id="acolor" placeholder="Color" />
        <input id="asize" placeholder="Size" type="number" />
        <input id="aowner" placeholder="Owner" />
        <input id="avalue" placeholder="Value" type="number" />
        <button onClick={createAsset}>Create</button>
      </div>

      <div className="card">
        <h2>Query Asset</h2>
        <input id="qid" placeholder="Asset ID" />
        <button onClick={queryAsset}>Query</button>
      </div>

      <div className="card">
        <h2>Transfer Asset</h2>
        <input id="tid" placeholder="Asset ID" />
        <input id="towner" placeholder="New Owner" />
        <button onClick={transferAsset}>Transfer</button>
      </div>

      <div className="card">
        <h2>Ledger</h2>
        <ul>
          {ledger.map((a) => (
            <li key={a.id}>
              {a.id} → Color={a.color}, Size={a.size}, Owner={a.owner}, Value={a.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Transaction Logs</h2>
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
