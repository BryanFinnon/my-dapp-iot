import React, { useEffect, useState } from "react";

const Marketplace = ({ onBack }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch("http://localhost/get_devices.php")
      .then(res => res.json())
      .then(data => setDevices(data))
      .catch(err => console.error(err));
  }, []);

  return (
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
          <p><b>ID:</b> {device.device_id}</p>
          <p><b>Type:</b> {device.type}</p>
          <p><b>Price:</b> {device.price} ETH</p>
          <p><b>Owner:</b> {device.owner}</p>
          <p><b>Tx:</b> {device.txHash}</p>
          {device.metadata && <p><b>Metadata:</b> {device.metadata}</p>}

    <button
      className="buy-button"
      onClick={() => alert(`(Simulation) You want to buy ${device.name} for ${device.price} ETH`)}
    >
      Buy
    </button>
  </div>
))

        )}
      </div>
    </div>
  );
};

export default Marketplace;