import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

function Geofences() {
  const [geofences, setGeofences] = useState([]);

  useEffect(() => {
    fetchGeofences();
  }, []);

  const fetchGeofences = async () => {
    try {
      const res = await api.get("/geofences");
      setGeofences(res.data.geofences || []);
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
        Geofences
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
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>

          <tbody>
            {geofences.map((geofence) => (
              <tr key={geofence.id}>
                <td style={tdStyle}>{geofence.name}</td>
                <td style={tdStyle}>{geofence.description}</td>
                <td style={tdStyle}>{geofence.category}</td>
                <td style={tdStyle}>{geofence.status}</td>
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

export default Geofences;