import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await api.get("/vehicles");
      setVehicles(res.data.vehicles || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <h1
        style={{
          color: "white",
          marginBottom: "25px",
        }}
      >
        Vehicles
      </h1>

      <div
        style={{
          background: "#FFF0D9",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Vehicle Number</th>
              <th style={thStyle}>Driver</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td style={tdStyle}>{vehicle.vehicle_number}</td>
                <td style={tdStyle}>{vehicle.driver_name}</td>
                <td style={tdStyle}>{vehicle.vehicle_type}</td>
                <td style={tdStyle}>{vehicle.phone}</td>
                <td style={tdStyle}>{vehicle.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

export default Vehicles;