import React from "react";
import "./App.css";

const Dashboard = ({ account, onLogout, onRegisterDevice, onGoToMarketplace, onGoToPublishData }) => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-logo">IoT DataChain</div>
        <div className="dashboard-account">
          <span className="account-address">
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : ""}
          </span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main>
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-cards">
          {/* Remplace onClick={alert} par onClick={onRegisterDevice} */}
          <div className="dashboard-card" onClick={onRegisterDevice}>
            <span className="dashboard-icon" role="img" aria-label="Register">📡</span>
            <h2>Register Device</h2>
            <p>Add a new IoT device to the blockchain</p>
          </div>

          <div className="dashboard-card" onClick={onGoToPublishData}>
            <span className="dashboard-icon" role="img" aria-label="Publish">📤</span>
            <h2>Publish Data</h2>
            <p>Send data from a registered device to the marketplace</p>
          </div>

          <div className="dashboard-card"  onClick={onGoToMarketplace}>
            <span className="dashboard-icon" role="img" aria-label="Marketplace">🛒</span>
            <h2>Marketplace</h2>
            <p>Explore and trade available IoT data</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;