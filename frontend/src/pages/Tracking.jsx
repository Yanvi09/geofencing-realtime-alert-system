import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Tracking() {
  const [vehicleId, setVehicleId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [result, setResult] = useState(null);

  const updateLocation = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/vehicles/location",
        {
          vehicle_id: vehicleId,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          timestamp: new Date().toISOString(),
        }
      );

      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Location update failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "40px" }}>
          <h1 style={{ color: "white" }}>
            Live Vehicle Tracking
          </h1>

          <div
            style={{
              background: "#efe2cb",
              padding: "30px",
              borderRadius: "20px",
              marginTop: "20px",
              maxWidth: "700px",
            }}
          >
            <h2>Update Vehicle Location</h2>

            <input
              placeholder="Vehicle ID"
              value={vehicleId}
              onChange={(e) =>
                setVehicleId(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
              }}
            />

            <input
              placeholder="Latitude"
              value={latitude}
              onChange={(e) =>
                setLatitude(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
              }}
            />

            <input
              placeholder="Longitude"
              value={longitude}
              onChange={(e) =>
                setLongitude(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
              }}
            />

            <button
              onClick={updateLocation}
              style={{
                background: "#7c3aed",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Update Location
            </button>
          </div>

          {result && (
            <div
              style={{
                background: "#efe2cb",
                padding: "30px",
                borderRadius: "20px",
                marginTop: "30px",
                maxWidth: "700px",
              }}
            >
              <h2>Current Status</h2>

              <p>
                Vehicle ID:
                {" "}
                {result.vehicle_id}
              </p>

              <p>
                Location Updated:
                {" "}
                {String(
                  result.location_updated
                )}
              </p>

              <h3>
                Current Geofences
              </h3>

              {result.current_geofences?.map(
                (geo, index) => (
                  <div key={index}>
                    <strong>
                      {geo.geofence_name}
                    </strong>
                    {" "}
                    -
                    {" "}
                    {geo.status}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}