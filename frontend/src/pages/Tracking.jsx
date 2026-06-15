import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Tracking() {
  const [vehicles, setVehicles] = useState([]);
  const [geofences, setGeofences] = useState([]);

  const [vehicleId, setVehicleId] = useState("");
  const [geofenceName, setGeofenceName] = useState("");
  const [locationType, setLocationType] = useState("outside");

  const [result, setResult] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
     const vehiclesRes = await axios.get(
  "https://geofencing-realtime-alert-system.onrender.com/vehicles"
);

      const geoRes = await axios.get(
  "https://geofencing-realtime-alert-system.onrender.com/geofences"
);

      setVehicles(vehiclesRes.data.vehicles || []);
      setGeofences(geoRes.data.geofences || []);
    } catch (err) {
      console.log(err);
    }
  };

  const updateLocation = async () => {
    try {
      let latitude;
      let longitude;

      if (locationType === "inside") {
        latitude = 37.7790;
        longitude = -122.4150;
      } else {
        latitude = 28.6139;
        longitude = 77.2090;
      }

      const res = await axios.post(
  "https://geofencing-realtime-alert-system.onrender.com/vehicles/location",
        {
          vehicle_id: vehicleId,
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        }
      );

      setResult({
        ...res.data,
        selectedGeofence: geofenceName,
        locationType,
      });

      alert("Location Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
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
              fontSize: "50px",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Vehicle Tracking & Geofence Monitoring
          </h1>

          <div
            style={{
              background: "#efe2cb",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2>Update Vehicle Location</h2>

            <select
              value={vehicleId}
              onChange={(e) =>
                setVehicleId(e.target.value)
              }
              style={inputStyle}
            >
              <option value="">
                Select Vehicle
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
              value={geofenceName}
              onChange={(e) =>
                setGeofenceName(e.target.value)
              }
              style={inputStyle}
            >
              <option value="">
                Select Geofence
              </option>

              {geofences.map((g) => (
                <option
                  key={g.id}
                  value={g.name}
                >
                  {g.name}
                </option>
              ))}
            </select>

            <select
              value={locationType}
              onChange={(e) =>
                setLocationType(e.target.value)
              }
              style={inputStyle}
            >
              <option value="outside">
                Move Vehicle Outside Zone
              </option>

              <option value="inside">
                Move Vehicle Inside Zone
              </option>
            </select>

            <button
              onClick={updateLocation}
              style={{
                background: "#7c3aed",
                color: "white",
                border: "none",
                padding: "12px 30px",
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
              }}
            >
              <h2>Tracking Result</h2>

              <p>
                <strong>Status:</strong> Vehicle location updated successfully
              </p>

              <p>
                <strong>Selected Geofence:</strong>{" "}
                {result.selectedGeofence}
              </p>

              <p>
                <strong>Vehicle Position:</strong>{" "}
                {result.locationType === "inside"
                  ? "Inside Geofence"
                  : "Outside Geofence"}
              </p>

              <p>
                <strong>Last Update:</strong>{" "}
                {new Date().toLocaleString()}
              </p>

              <hr />

              <h3>Current Geofence Status</h3>

              {result.current_geofences?.length > 0 ? (
                result.current_geofences.map(
                  (geo, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "10px",
                        marginBottom: "10px",
                        background: "#ffffff",
                        borderRadius: "10px",
                      }}
                    >
                      <strong>
                        {geo.geofence_name}
                      </strong>
                      {" "}
                      - {geo.status}
                    </div>
                  )
                )
              ) : (
                <p>
                  Vehicle currently outside all
                  geofences
                </p>
              )}
            </div>
          )}
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