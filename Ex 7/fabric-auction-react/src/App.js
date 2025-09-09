import React, { useState } from "react";
import FabricAuction from "./components/FabricAuction";
import "./styles.css";

const fabric = new FabricAuction();

function App() {
  const [ledger, setLedger] = useState(fabric.getLedger());
  const [logs, setLogs] = useState(fabric.getLogs());
  const [msg, setMsg] = useState("");

  const handleCreate = () => {
    const id = document.getElementById("aid").value;
    const car = document.getElementById("acar").value;
    const res = fabric.createAuction(id, car);
    setLedger([...fabric.getLedger()]);
    setLogs([...fabric.getLogs()]);
    setMsg(res);
  };

  const handleBid = () => {
    const id = document.getElementById("bid").value;
    const bidder = document.getElementById("bbidder").value;
    const amount = parseInt(document.getElementById("bamt").value);
    const res = fabric.placeBid(id, bidder, amount);
    setLedger([...fabric.getLedger()]);
    setLogs([...fabric.getLogs()]);
    setMsg(res);
  };

  const handleQuery = () => {
    const id = document.getElementById("qid").value;
    const auction = fabric.queryAuction(id);
    setLogs([...fabric.getLogs()]);
    if (typeof auction === "string") {
      setMsg(auction);
    } else {
      setMsg(
        `Auction ${auction.auctionID}: Car=${auction.car}, HighestBid=${auction.highestBid}, Bidder=${auction.highestBidder}`
      );
    }
  };

  return (
    <div className="app">
      <h1> Fabric Network Auction Simulation </h1>
      <p>{msg}</p>

      <div className="card">
        <h2>Create Auction</h2>
        <input id="aid" placeholder="Auction ID" />
        <input id="acar" placeholder="Car Name" />
        <button onClick={handleCreate}>Create</button>
      </div>

      <div className="card">
        <h2>Place Bid</h2>
        <input id="bid" placeholder="Auction ID" />
        <input id="bbidder" placeholder="Bidder Name" />
        <input id="bamt" placeholder="Bid Amount" type="number" />
        <button onClick={handleBid}>Bid</button>
      </div>

      <div className="card">
        <h2>Query Auction</h2>
        <input id="qid" placeholder="Auction ID" />
        <button onClick={handleQuery}>Query</button>
      </div>

      <div className="card">
        <h2>Ledger</h2>
        <ul>
          {ledger.map((a) => (
            <li key={a.auctionID}>
              {a.auctionID} → Car={a.car}, HighestBid={a.highestBid}, Bidder={a.highestBidder}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Transaction Logs</h2>
        <ul>
          {logs.map((l, i) => (
            <li key={i}>
              TxID: {l.txID}, Time: {l.time}, Action: {l.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
