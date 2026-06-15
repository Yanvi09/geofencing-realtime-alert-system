import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Violations() {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    fetchViolations();
  }, []);

  const fetchViolations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/violations/history"
      );

      setViolations(
        res.data.violations || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "40px" }}>
          <h1
            style={{
              color: "white",
              fontSize: "60px",
              textAlign: "center",
            }}
          >
            Violations
          </h1>

          <div
            style={{
              background: "#efe2cb",
              borderRadius: "20px",
              padding: "25px",
            }}
          >
            <table
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Geofence</th>
                  <th>Event</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>

              <tbody>
                {violations.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.vehicle_number}
                    </td>

                    <td>
                      {item.geofence_name}
                    </td>

                    <td>
                      {item.event_type}
                    </td>

                    <td>
                      {item.latitude}
                    </td>

                    <td>
                      {item.longitude}
                    </td>
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