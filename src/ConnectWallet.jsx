import React, { useState } from "react";
import "./App.css";

const ConnectWallet = ({ onConnected }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const connectWallet = async () => {
    setError("");
    setStatus("Connecting...");
    if (window.ethereum) {
      try {
        // Vérifie le réseau (optionnel, ici Ethereum Mainnet = 1)
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (chainId !== "0x1" && chainId !== "0x5" && chainId !== "0x11155111") {
          setError("Please switch to Ethereum Mainnet or a supported testnet.");
          setStatus("");
          return;
        }
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setCurrentAccount(account);
        setStatus(`Connected as ${account.slice(0, 6)}...${account.slice(-4)}`);
      } catch (err) {
        if (err.code === 4001) {
          setError("Connection request denied");
        } else {
          setError("Error: " + err.message);
        }
        setStatus("");
      }
    } else {
      setError("Please install MetaMask to continue");
      setStatus("");
    }
  };

  return (
    <div className="connect-wallet-page">
      <div className="connect-card">
        <div className="logo-row">
          <img src="https://cdn-icons-png.flaticon.com/512/4144/4144406.png" alt="Logo" style={{width: 48, marginRight: 12}} />
          <span className="project-title">IoT DataChain</span>
        </div>
        <h1 className="welcome-title">Welcome to IoT DataChain</h1>
        <p className="welcome-subtitle">Connect your wallet to start using the platform</p>
        {error && <div className="error-message">{error}</div>}
        {!currentAccount ? (
          <button className="connect-btn" onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <>
            <div className="connected-message">{status}</div>
            <button className="cta-btn" onClick={() => onConnected(currentAccount)}>
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;