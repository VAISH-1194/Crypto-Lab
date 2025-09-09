import React, { useState } from "react";
import RewardsSystem from "./components/RewardsSystem";
import "./styles.css";

const rewards = new RewardsSystem();

function App() {
  const [members, setMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [msg, setMsg] = useState("");

  const handleAddMember = () => {
    const id = document.getElementById("mid").value;
    const res = rewards.addMember(id);
    setMembers(rewards.getAllMembers());
    setLogs([...rewards.getLogs()]);
    setMsg(res);
  };

  const handleAddPoints = () => {
    const id = document.getElementById("pid").value;
    const pts = parseInt(document.getElementById("ppoints").value);
    const res = rewards.addPoints(id, pts);
    setMembers(rewards.getAllMembers());
    setLogs([...rewards.getLogs()]);
    setMsg(res);
  };

  const handleCheckPoints = () => {
    const id = document.getElementById("cid").value;
    const res = rewards.checkPoints(id);
    setLogs([...rewards.getLogs()]);
    setMsg(res);
  };

  return (
    <div className="app">
      <h1> Fitness Club Rewards </h1>
      <p>{msg}</p>

      <div className="card">
        <h2>Add Member</h2>
        <input id="mid" placeholder="Member ID" />
        <button onClick={handleAddMember}>Add</button>
      </div>

      <div className="card">
        <h2>Issue Reward Points</h2>
        <input id="pid" placeholder="Member ID" />
        <input id="ppoints" placeholder="Points" type="number" />
        <button onClick={handleAddPoints}>Add Points</button>
      </div>

      <div className="card">
        <h2>Check Points</h2>
        <input id="cid" placeholder="Member ID" />
        <button onClick={handleCheckPoints}>Check</button>
      </div>

      <div className="card">
        <h2>All Members</h2>
        <ul>
          {members.map((m) => (
            <li key={m.id}>
              Member ID: {m.id}, Points: {m.points}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Action Logs</h2>
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
