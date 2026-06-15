import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await api.get("/alerts");
      setAlerts(res.data.alerts || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <h1 style={{ color: "white", marginBottom: "25px" }}>
        Alerts
      </h1>

      <div
        style={{
          background: "#FFF0D9",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        {alerts.length === 0 ? (
          <h3>No Alerts Configured</h3>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id}>
              {alert.alert_type}
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default Alerts;