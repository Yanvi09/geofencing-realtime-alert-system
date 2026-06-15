import { useEffect, useState } from "react";

export default function Navbar() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    try {
      const socket = new WebSocket("wss://geofencing-realtime-alert-system.onrender.com");

      socket.onopen = () => {
        setConnected(true);
      };

      socket.onclose = () => {
        setConnected(false);
      };

      return () => socket.close();
    } catch {
      setConnected(false);
    }
  }, []);

  return (
    <div
      style={{
        background: "#151936",
        padding: "25px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #2b315e",
      }}
    >
      <h2
        style={{
          color: "white",
          margin: 0,
        }}
      >
        Geofencing Real-Time Alert System
      </h2>

      <div
        style={{
          background: connected ? "#22c55e" : "#ef4444",
          color: "white",
          padding: "12px 24px",
          borderRadius: "12px",
          fontWeight: "bold",
        }}
      >
        {connected ? "🟢 Live" : "🔴 Offline"}
      </div>
    </div>
  );
}