import React, { useState } from "react";
import "./App.css"; // Assurez-vous que ce fichier CSS existe et est correctement configuré

const RegisterDevice = ({ account, onDeviceRegistered, onBack }) => {
  // États pour les champs du formulaire
  const [deviceName, setDeviceName] = useState("");
  const [deviceDescription, setDeviceDescription] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [devicePrice, setDevicePrice] = useState("");
  const [metadata, setMetadata] = useState("");

  // États pour le statut et les messages
  const [status, setStatus] = useState("Connected to Ethereum Network");
  const [success, setSuccess] = useState(false); // Indique si l'enregistrement complet a réussi
  const [txHash, setTxHash] = useState(""); // Stocke le hash de transaction simulé
  const [error, setError] = useState(""); // Stocke les messages d'erreur

  /**
   * Gère la soumission du formulaire d'enregistrement de l'appareil.
   * Simule une transaction blockchain puis envoie les données au backend PHP.
   */
  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut du formulaire

    // Réinitialise les messages d'état et d'erreur
    setError("");
    setSuccess(false);
    setTxHash(""); // Réinitialise le hash de transaction
    setStatus("Registering device on blockchain (simulated)..."); // Met à jour le statut initial

    try {
      // Simule une confirmation de transaction sur la blockchain (attente de 1.5 secondes)
      // La fonction de rappel de setTimeout doit être 'async' pour utiliser 'await' à l'intérieur
      setTimeout(async () => {
        // Génère un hash de transaction simulé
        const simulatedTxHash = "0x" + Math.random().toString(16).slice(2, 10) + "...abcd";
        setTxHash(simulatedTxHash); // Met à jour l'état avec le hash simulé
        setStatus("Blockchain transaction confirmed. Sending data to marketplace backend..."); // Nouveau statut

        try {
          // Effectue la requête POST vers le backend PHP
          const response = await fetch("http://localhost/register_device.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Indique que le corps est du JSON
            body: JSON.stringify({ // Convertit l'objet JavaScript en chaîne JSON
              name: deviceName,
              description: deviceDescription,
              id: deviceId,
              type: deviceType,
              price: parseFloat(devicePrice), // Convertit le prix en nombre flottant
              metadata,
              owner: account,
              txHash: simulatedTxHash // Utilise le hash de transaction simulé
            })
          });

          // Vérifie si la réponse HTTP est OK (statut 200-299)
          if (!response.ok) {
            const errorText = await response.text(); // Tente de lire le corps de l'erreur
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }

          const data = await response.json(); // Parse la réponse JSON du backend PHP

          // Vérifie la propriété 'success' dans la réponse JSON du backend
          if (data.success) {
            setSuccess(true); // Indique que l'enregistrement a réussi
            setStatus("Device registered successfully on marketplace!"); // Statut final de succès
            // Appelle la fonction de rappel pour publier l'appareil sur le marketplace local de l'application React
            onDeviceRegistered({
              name: deviceName,
              description: deviceDescription,
              id: deviceId,
              type: deviceType,
              price: devicePrice, // Garde le prix en chaîne pour la cohérence si onDeviceRegistered l'attend ainsi
              metadata,
              owner: account,
              txHash: simulatedTxHash, // Passe le hash de transaction simulé
            });
          } else {
            // Gère l'échec de l'enregistrement côté backend (si data.success est false)
            setError(data.message || "Failed to register device on marketplace backend.");
            setStatus("Error during marketplace registration.");
          }
        } catch (fetchError) {
          // Gère les erreurs réseau ou les problèmes avec la requête fetch elle-même
          setError("Network or server error during marketplace registration: " + fetchError.message);
          setStatus("Error during marketplace registration.");
        }
      }, 1500); // Durée de simulation de la transaction blockchain
    } catch (blockchainError) {
      // Ce bloc catch gérerait les erreurs d'une interaction blockchain réelle.
      // Pour une simulation avec setTimeout, il est moins probable d'être atteint.
      setError("Blockchain simulation error: " + blockchainError.message);
      setStatus("Error during blockchain simulation.");
    }
  };

  return (
    <div className="register-device-container">
      {/* Ce div est le conteneur principal qui gère la disposition flex-direction: row */}
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
        {success && <div className="success-message">Device registered successfully! Transaction Hash: {txHash}</div>}
      </div>

      <div className="register-status-section">
        {/* Le contenu de la section de droite */}
        <div className="status-card">
          <h3>Connected</h3>
          <p><b>Account</b><br />{account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}</p>
          <p><b>Status</b><br />{status}</p>
          {txHash && <p><b>Tx Hash</b><br />{txHash}</p>}
        </div>
        {/* Le bouton "Back to Dashboard" est MAINTENANT ici, après la status-card */}
        <button className="back-btn" onClick={onBack}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default RegisterDevice;
