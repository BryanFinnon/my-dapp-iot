import React, { useEffect, useState } from "react";
import "./App.css";

const PublishData = ({ account, onBack }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [dataType, setDataType] = useState("");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [status, setStatus] = useState("");

  // Récupérer les appareils de l'utilisateur connecté
  useEffect(() => {
    fetch("http://localhost/get_devices.php")
      .then(res => res.json())
      .then(data => {
        const owned = data.filter(device => device.owner === account);
        setDevices(owned);
      })
      .catch(err => console.error("Erreur de chargement des devices:", err));
  }, [account]);

  const handlePublish = (e) => {
    e.preventDefault();

    if (!selectedDeviceId || !dataType || !value || !unit) {
      setStatus("Please fill in all fields.");
      return;
    }

    // Simulation de la publication de données (ex: dans un futur backend)
    const dataPayload = {
      deviceId: selectedDeviceId,
      timestamp: new Date().toISOString(),
      dataType,
      value,
      unit,
    };

    console.log("Data published:", dataPayload);
    setStatus("Data successfully published (simulation)." );
    setDataType("");
    setValue("");
    setUnit("");
    setSelectedDeviceId("");
  };

  return (
    <div className="publish-data-container">
      <header className="dashboard-header">
        <div className="dashboard-logo">IoT DataChain</div>
        <button className="back-btn" onClick={onBack}>Back to Dashboard</button>
      </header>
      <h1 className="dashboard-title">Publish Device Data</h1>
      <form className="publish-form" onSubmit={handlePublish}>
        <label>Select Your Device</label>
        <select value={selectedDeviceId} onChange={e => setSelectedDeviceId(e.target.value)} required>
          <option value="">-- Choose a device --</option>
          {devices.map((device, idx) => (
            <option key={idx} value={device.device_id}>
              {device.name} ({device.device_id})
            </option>
          ))}
        </select>

        <label>Data Type</label>
        <input type="text" value={dataType} onChange={e => setDataType(e.target.value)} placeholder="e.g. temperature" required />

        <label>Value</label>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} required />

        <label>Unit</label>
        <input type="text" value={unit} onChange={e => setUnit(e.target.value)} placeholder="e.g. °C, kWh, g" required />

        <button type="submit" className="submit-btn">Publish Data</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default PublishData;
