import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

function Violations() {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    fetchViolations();
  }, []);

  const fetchViolations = async () => {
    try {
      const res = await api.get("/violations/history");
      setViolations(res.data.violations || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <h1 style={{ color: "white", marginBottom: "25px" }}>
        Violations
      </h1>

      <div
        style={{
          background: "#FFF0D9",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Geofence</th>
              <th>Event</th>
            </tr>
          </thead>

          <tbody>
            {violations.map((v) => (
              <tr key={v.id}>
                <td>{v.vehicle_number}</td>
                <td>{v.geofence_name}</td>
                <td>{v.event_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default Violations;