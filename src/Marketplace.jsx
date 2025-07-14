import React from "react";
import "./App.css";

const Marketplace = ({ devices, onBack }) => (
  <div className="marketplace-container">
    <header className="dashboard-header">
      <div className="dashboard-logo">IoT DataChain</div>
      <button className="back-btn" onClick={onBack}>Back to Dashboard</button>
    </header>
    <h1 className="dashboard-title">Marketplace</h1>
    <div className="marketplace-list">
      {devices.length === 0 ? (
        <p>No devices published yet.</p>
      ) : (
        devices.map((device, idx) => (
          <div className="marketplace-card" key={idx}>
            <h2>{device.name}</h2>
            <p>{device.description}</p>
            <p><b>ID:</b> {device.id}</p>
            <p><b>Type:</b> {device.type}</p>
            <p><b>Price:</b> {device.price} ETH</p>
            <p><b>Owner:</b> {device.owner ? `${device.owner.slice(0,6)}...${device.owner.slice(-4)}` : ""}</p>
            <p><b>Tx:</b> {device.txHash}</p>
            {device.metadata && <p><b>Metadata:</b> {device.metadata}</p>}
          </div>
        ))
      )}
    </div>
  </div>
);

export default Marketplace;