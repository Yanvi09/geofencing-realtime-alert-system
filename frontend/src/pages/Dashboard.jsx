import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [stats, setStats] = useState({
    vehicles: 0,
    geofences: 0,
    violations: 0,
    alerts: 0,
  });

  useEffect(() => {
    api.get("/dashboard/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MainLayout>
      <h1
        style={{
          color: "white",
          marginBottom: "25px",
        }}
      >
        Dashboard Overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        <StatCard title="Vehicles" value={stats.vehicles} />
        <StatCard title="Geofences" value={stats.geofences} />
        <StatCard title="Violations" value={stats.violations} />
        <StatCard title="Alerts" value={stats.alerts} />
      </div>
    </MainLayout>
  );
}

export default Dashboard;