import React, { useState } from "react";
import FabricNetwork from "./components/FabricNetwork";
import "./styles.css";

const fabric = new FabricNetwork();
fabric.createChannel("mychannel");
fabric.deployChaincode("fabcar");
fabric.registerUser("user1");

function App() {
  const [ledger, setLedger] = useState({});
  const [logs, setLogs] = useState([]);
  const [queryResult, setQueryResult] = useState("");

  const handleInvoke = (key, value) => {
    fabric.invoke(key, value);
    setLedger({ ...fabric.getLedger() });
    setLogs([...fabric.getLogs()]);
  };

  const handleQuery = (key) => {
    const result = fabric.query(key);
    setQueryResult(result);
    setLogs([...fabric.getLogs()]);
  };

  return (
    <div className="app">
      <h1> Fabric Network Simulation </h1>

      <div className="card">
        <h2>Create Transaction</h2>
        <input id="key" placeholder="Enter Key" />
        <input id="value" placeholder="Enter Value" />
        <button
          onClick={() =>
            handleInvoke(
              document.getElementById("key").value,
              document.getElementById("value").value
            )
          }
        >
          Create
        </button>
      </div>

      <div className="card">
        <h2>Query Transaction</h2>
        <input id="queryKey" placeholder="Enter Key" />
        <button
          onClick={() =>
            handleQuery(document.getElementById("queryKey").value)
          }
        >
          Query
        </button>
        <p>{queryResult}</p>
      </div>

      <div className="card">
        <h2>Ledger</h2>
        {Object.keys(ledger).length === 0 ? (
          <p>[WARN] Ledger is empty</p>
        ) : (
          <ul>
            {Object.entries(ledger).map(([k, v]) => (
              <li key={k}>
                {k} → {v}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2>Transaction Logs</h2>
        {logs.length === 0 ? (
          <p>[WARN] No logs available</p>
        ) : (
          <ul>
            {logs.map((log, i) => (
              <li key={i}>{log}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
