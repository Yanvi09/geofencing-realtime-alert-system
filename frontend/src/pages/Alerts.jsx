import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Alerts() {
  const [vehicles, setVehicles] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [form, setForm] = useState({
    vehicle_id: "",
    geofence_id: "",
    event_type: "entry",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const vehicleRes = await axios.get(
      "http://localhost:8080/vehicles"
    );

    const geoRes = await axios.get(
      "http://localhost:8080/geofences"
    );

    const alertRes = await axios.get(
      "http://localhost:8080/alerts"
    );

    setVehicles(vehicleRes.data.vehicles || []);
    setGeofences(geoRes.data.geofences || []);
    setAlerts(alertRes.data.alerts || []);
  };

  const createAlert = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/alerts/configure",
        form
      );

      alert("Alert Rule Created");

      loadData();
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "40px" }}>
          <h1 style={{ color: "white" }}>
            Alert Management
          </h1>

          <form
            onSubmit={createAlert}
            style={{
              background: "#FFF0D9",
              padding: "25px",
              borderRadius: "16px",
              marginBottom: "30px",
            }}
          >
            <h2>Create Alert Rule</h2>

            <select
              style={inputStyle}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_id: e.target.value,
                })
              }
            >
              <option>Select Vehicle</option>

              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.vehicle_number}
                </option>
              ))}
            </select>

            <select
              style={inputStyle}
              onChange={(e) =>
                setForm({
                  ...form,
                  geofence_id: e.target.value,
                })
              }
            >
              <option>Select Geofence</option>

              {geofences.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <select
              style={inputStyle}
              onChange={(e) =>
                setForm({
                  ...form,
                  event_type: e.target.value,
                })
              }
            >
              <option value="entry">
                Entry
              </option>

              <option value="exit">
                Exit
              </option>

              <option value="both">
                Both
              </option>
            </select>

            <button
              type="submit"
              style={buttonStyle}
            >
              Create Alert
            </button>
          </form>

          <div
            style={{
              background: "#FFF0D9",
              padding: "20px",
              borderRadius: "16px",
            }}
          >
            <h2>Configured Alerts</h2>

            {alerts.map((alert) => (
              <div
                key={alert.id}
                style={{
                  padding: "10px",
                  borderBottom:
                    "1px solid #ddd",
                }}
              >
                Event:
                {" "}
                {alert.event_type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
};

const buttonStyle = {
  background: "#723EC3",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
};