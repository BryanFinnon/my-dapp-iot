import React, { useState } from "react";
import "./App.css";

const RegisterDevice = ({ account, onDeviceRegistered, onBack }) => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceDescription, setDeviceDescription] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [devicePrice, setDevicePrice] = useState("");
  const [metadata, setMetadata] = useState("");
  const [status, setStatus] = useState("Connected to Ethereum Network");
  const [success, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setStatus("Registering device...");
    try {
      // Simule l'enregistrement sur la blockchain
      setTimeout(() => {
        setTxHash("0x" + Math.random().toString(16).slice(2, 10) + "...abcd");
        setSuccess(true);
        setStatus("Connected to Ethereum Network");
        // Publie le device sur le marketplace
        onDeviceRegistered({
          name: deviceName,
          description: deviceDescription,
          id: deviceId,
          type: deviceType,
          price: devicePrice,
          metadata,
          owner: account,
          txHash,
        });
      }, 1500);
    } catch (err) {
      setError("Blockchain error: " + err.message);
      setStatus("Error");
    }
  };

  return (
    <div className="register-device-container">
      <div className="register-form-section">
        <h1 className="form-title">IoT Device Registration</h1>
        <form className="device-form" onSubmit={handleRegister}>
          <label>Device Name</label>
          <input type="text" value={deviceName} onChange={e => setDeviceName(e.target.value)} required />

          <label>Device Description</label>
          <input type="text" value={deviceDescription} onChange={e => setDeviceDescription(e.target.value)} required />

          <label>Device ID</label>
          <input type="text" value={deviceId} onChange={e => setDeviceId(e.target.value)} required />

          <label>Device Type</label>
          <input type="text" value={deviceType} onChange={e => setDeviceType(e.target.value)} required />

          <label>Device Price (ETH)</label>
          <input type="number" value={devicePrice} onChange={e => setDevicePrice(e.target.value)} step="0.001" required />

          <label>Metadata (optional)</label>
          <input type="text" value={metadata} onChange={e => setMetadata(e.target.value)} />

          <button type="submit" className="submit-btn">Register Device</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        <button className="back-btn" onClick={onBack} style={{marginTop: 16}}>Back to Dashboard</button>
      </div>
      <div className="register-status-section">
        <div className="status-card">
          <h3>Connected</h3>
          <p><b>Account</b><br />{account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}</p>
          <p><b>Status</b><br />{status}</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterDevice;