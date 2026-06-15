import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    vehicle_number: "",
    driver_name: "",
    vehicle_type: "",
    phone: "",
  });

  const loadVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/vehicles");

      setVehicles(res.data.vehicles || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const createVehicle = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/vehicles", form);

      alert("Vehicle Created");

      setForm({
        vehicle_number: "",
        driver_name: "",
        vehicle_type: "",
        phone: "",
      });

      loadVehicles();
    } catch (err) {
      console.log(err);
      alert("Failed to create vehicle");
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

        <div
          style={{
            padding: "40px",
          }}
        >
          <h1
            style={{
              color: "white",
              marginBottom: "30px",
            }}
          >
            Vehicle Management
          </h1>

          <form
            onSubmit={createVehicle}
            style={{
              background: "#FFF0D9",
              padding: "25px",
              borderRadius: "16px",
              marginBottom: "40px",
            }}
          >
            <h2>Create Vehicle</h2>

            <input
              placeholder="Vehicle Number"
              value={form.vehicle_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_number: e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Driver Name"
              value={form.driver_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  driver_name: e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Vehicle Type"
              value={form.vehicle_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_type: e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                background: "#723EC3",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Create Vehicle
            </button>
          </form>

          <div
            style={{
              background: "#FFF0D9",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <h2>Registered Vehicles</h2>

            <table
              style={{
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Type</th>
                  <th>Phone</th>
                </tr>
              </thead>

              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.vehicle_number}</td>
                    <td>{vehicle.driver_name}</td>
                    <td>{vehicle.vehicle_type}</td>
                    <td>{vehicle.phone}</td>
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