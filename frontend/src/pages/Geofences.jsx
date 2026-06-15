import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Geofences() {
  const [geofences, setGeofences] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "delivery_zone",
  });

  const loadGeofences = async () => {
    try {
      const res = await axios.get( "https://geofencing-realtime-alert-system.onrender.com/geofences");
      setGeofences(res.data.geofences || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadGeofences();
  }, []);

  const createGeofence = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      coordinates: [
        [37.7749, -122.4194],
        [37.7849, -122.4194],
        [37.7849, -122.4094],
        [37.7749, -122.4094],
        [37.7749, -122.4194],
      ],
    };

    try {
      await axios.post("https://geofencing-realtime-alert-system.onrender.com/geofences", payload);

      alert("Geofence Created");

      setForm({
        name: "",
        description: "",
        category: "delivery_zone",
      });

      loadGeofences();
    } catch (err) {
      console.log(err);
      alert("Failed to create geofence");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#050A30",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "40px" }}>
          <h1 style={{ color: "white" }}>
            Geofence Management
          </h1>

          <form
            onSubmit={createGeofence}
            style={{
              background: "#FFF0D9",
              padding: "25px",
              borderRadius: "16px",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <h2>Create Geofence</h2>

            <input
              placeholder="Geofence Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              style={inputStyle}
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              style={inputStyle}
            >
              <option value="delivery_zone">
                Delivery Zone
              </option>

              <option value="restricted_zone">
                Restricted Zone
              </option>

              <option value="toll_zone">
                Toll Zone
              </option>

              <option value="customer_area">
                Customer Area
              </option>
            </select>

            <button
              type="submit"
              style={{
                background: "#723EC3",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Create Geofence
            </button>
          </form>

          <div
            style={{
              background: "#FFF0D9",
              padding: "20px",
              borderRadius: "16px",
            }}
          >
            <h2>Geofence List</h2>

            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                </tr>
              </thead>

              <tbody>
                {geofences.map((geo) => (
                  <tr key={geo.id}>
                    <td>{geo.name}</td>
                    <td>{geo.description}</td>
                    <td>{geo.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  borderRadius: "8px",
  border: "1px solid #ccc",
};