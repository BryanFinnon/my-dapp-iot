/*import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [status, setStatus] = useState("Please connect your MetaMask wallet.");
  const [signature, setSignature] = useState(null);

  const [deviceId, setDeviceId] = useState('');
  const [dataType, setDataType] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          setStatus("Wallet is already linked!");
        }
      } catch (error) {
        console.error("Wallet verification failed", error);
      }
    }
  };

  const connectWallet = async () => {
    console.log("Connecting to MetaMask...");
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setCurrentAccount(account);

        const message = `Welcome to the IoT Marketplace!\nPlease sign this message to authenticate.\n\nDate: ${new Date().toISOString()}`;
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, account]
        });

        setSignature(signature);
        setStatus("Successfully authenticated!✅");
      } catch (err) {
        console.error(err);
        setStatus("❌ Authentication failed :  " + err.message);
      }
    } else {
      if (window.confirm("MetaMask is not installed. Would you like to install it?")) {
        window.open("https://metamask.io/download/", "_blank");
      }
    }
  };

  // Fonction de déconnexion
  const disconnectWallet = () => {
    setCurrentAccount(null);
    setSignature(null);
    setStatus("Please connet your MetaMask wallet.");
    setDeviceId('');
    setDataType('');
    setPrice('');
  };

  const handleRegisterDevice = async (e) => {
    e.preventDefault();
    try {
      // @todo : remplacer par l'adresse de ton contrat + ABI importée
      const contractAddress = "0x123...";
      const contractABI = []; // charger le bon ABI ici

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      await contract.methods.registerDevice(deviceId, dataType, web3.utils.toWei(price, 'ether'))
        .send({ from: currentAccount });

      alert("Device successfully registered !");
      setDeviceId('');
      setDataType('');
      setPrice('');
    } catch (err) {
      console.error("Registration error  :", err);
      alert("Error while registering the device");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">IoT Data Market</h1>
        <p className="status">{status}</p>

  {currentAccount ? (
    <div className="account-box">
    <p className="label">Connected account :</p>
    <p className="value">{currentAccount}</p>
   <form className="register-form" onSubmit={handleRegisterDevice}>
      <h2 className="form-title">Register your Iot device. </h2>
      <input type="text" placeholder="Device ID" value={deviceId} onChange={e => setDeviceId(e.target.value)} required />
      <input type="text" placeholder="Data type (Weather, Wind)"value={dataType} onChange={e => setDataType(e.target.value)} required />
      <input type="number" placeholder="Price (ETH)"value={price} onChange={e => setPrice(e.target.value)} step="0.001" required />
      <button type="submit" className="submit-btn">Registrer</button>
      <button
        type="button"
        onClick={disconnectWallet}
        className="connect-btn"
        style={{ backgroundColor: "#e53e3e", marginTop: 20 }}
      >
    Log out 
  </button>
</form>


      
  </div>
) : (
  <button onClick={connectWallet} className="connect-btn">
    Sign in with MetaMask
  </button>
)}

        <div className="footer">
          <p>⛓️ Blockchain x IoT</p>
        </div>
      </div>
    </div>
  );
};

export default App;*/

import React, { useState } from 'react';
import HomePage from './HomePage';
import ConnectWallet from './ConnectWallet';
import Dashboard from './Dashboard';
import RegisterDevice from './RegisterDevice';
import Marketplace from './Marketplace';
import './App.css';

const App = () => {
  const [page, setPage] = useState("home");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [devices, setDevices] = useState([]); // Liste des devices

  // Accueil → Connexion
  const handleGetStarted = () => setPage("connect");

  // Connexion → Dashboard
  const handleWalletConnected = (account) => {
    setCurrentAccount(account);
    setPage("dashboard");
  };

  // Déconnexion → Accueil
  const handleLogout = () => {
    setCurrentAccount(null);
    setPage("home");
  };

  // Dashboard → Register Device
  const handleRegisterDevice = () => setPage("registerDevice");

  // Register Device → Marketplace (après ajout)
  const handleDeviceRegistered = (device) => {
    setDevices([...devices, device]);
    setPage("marketplace");
  };

  // Dashboard → Marketplace
  const handleGoToMarketplace = () => setPage("marketplace");

  // Register Device → Dashboard
  const handleBackToDashboard = () => setPage("dashboard");

  return (
    <>
      {page === "home" && <HomePage onGetStarted={handleGetStarted} />}
      {page === "connect" && <ConnectWallet onConnected={handleWalletConnected} />}
      {page === "dashboard" && (
        <Dashboard
          account={currentAccount}
          onLogout={handleLogout}
          onRegisterDevice={handleRegisterDevice}
          onGoToMarketplace={handleGoToMarketplace}
        />
      )}
      {page === "registerDevice" && (
        <RegisterDevice
          account={currentAccount}
          onDeviceRegistered={handleDeviceRegistered}
          onBack={handleBackToDashboard}
        />
      )}
      {page === "marketplace" && (
        <Marketplace
          devices={devices}
          onBack={handleBackToDashboard}
        />
      )}
    </>
  );
};

export default App;