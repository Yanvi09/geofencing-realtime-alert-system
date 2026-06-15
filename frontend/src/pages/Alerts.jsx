import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Alerts() {
  const [vehicles, setVehicles] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [socketStatus, setSocketStatus] =
    useState("Disconnected");

  const [form, setForm] = useState({
    vehicle_id: "",
    geofence_id: "",
    event_type: "entry",
  });

  useEffect(() => {
    loadData();

    const ws = new WebSocket(
      "ws://localhost:8080/ws/alerts"
    );

    ws.onopen = () => {
      console.log("WebSocket Connected");
      setSocketStatus("Connected");
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setSocketStatus("Disconnected");
    };

    ws.onerror = (error) => {
      console.log(error);
      setSocketStatus("Error");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        setAlerts((prev) => [
          {
            id:
              data.event_id ||
              Date.now().toString(),

            event_type:
              data.event_type ||
              data.event,

            vehicle_number:
              data.vehicle?.vehicle_number ||
              data.vehicle,

            geofence_name:
              data.geofence?.geofence_name ||
              data.geofence,

            timestamp:
              data.timestamp ||
              new Date().toISOString(),
          },

          ...prev,
        ]);

        alert(
          `🚨 ${data.event_type?.toUpperCase()} ALERT\n\nVehicle: ${
            data.vehicle?.vehicle_number ||
            "Unknown"
          }\nGeofence: ${
            data.geofence?.geofence_name ||
            "Unknown"
          }`
        );
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const loadData = async () => {
    try {
      const vehicleRes =
        await axios.get(
          "http://localhost:8080/vehicles"
        );

      const geoRes =
        await axios.get(
          "http://localhost:8080/geofences"
        );

      const alertRes =
        await axios.get(
          "http://localhost:8080/alerts"
        );

      setVehicles(
        vehicleRes.data.vehicles || []
      );

      setGeofences(
        geoRes.data.geofences || []
      );

      setAlerts(
        alertRes.data.alerts || []
      );
    } catch (err) {
      console.log(err);
    }
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

          <div
            style={{
              background:
                socketStatus === "Connected"
                  ? "#16a34a"
                  : "#dc2626",

              color: "white",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            WebSocket Status:
            {" "}
            {socketStatus}
          </div>

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
                  vehicle_id:
                    e.target.value,
                })
              }
            >
              <option value="">
                All Vehicles
              </option>

              {vehicles.map((v) => (
                <option
                  key={v.id}
                  value={v.id}
                >
                  {v.vehicle_number}
                </option>
              ))}
            </select>

            <select
              style={inputStyle}
              onChange={(e) =>
                setForm({
                  ...form,
                  geofence_id:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Geofence
              </option>

              {geofences.map((g) => (
                <option
                  key={g.id}
                  value={g.id}
                >
                  {g.name}
                </option>
              ))}
            </select>

            <select
              style={inputStyle}
              onChange={(e) =>
                setForm({
                  ...form,
                  event_type:
                    e.target.value,
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
            <h2>
              Live Alert Feed
            </h2>

            {alerts.length === 0 ? (
              <p>
                No alerts received yet
              </p>
            ) : (
              alerts.map(
                (alert, index) => (
                  <div
                    key={
                      alert.id || index
                    }
                    style={{
                      padding: "12px",
                      marginBottom:
                        "10px",

                      borderRadius:
                        "10px",

                      background:
                        "#f8f8f8",
                    }}
                  >
                    <strong>
                      {alert.event_type}
                    </strong>

                    <br />

                    Vehicle:
                    {" "}
                    {alert.vehicle_number ||
                      alert.vehicle_id}

                    <br />

                    Geofence:
                    {" "}
                    {alert.geofence_name}

                    <br />

                    <small>
                      {
                        alert.timestamp
                      }
                    </small>
                  </div>
                )
              )
            )}
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