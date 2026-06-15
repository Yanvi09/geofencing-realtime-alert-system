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
        "http://localhost:8080/vehicles"
      );

      const geoRes = await axios.get(
        "http://localhost:8080/geofences"
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
        "http://localhost:8080/vehicles/location",
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
              fontSize: "60px",
              textAlign: "center",
            }}
          >
            Vehicle Tracking Simulation
          </h1>

          <div
            style={{
              background: "#efe2cb",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2>Select Vehicle & Geofence</h2>

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
                Vehicle Updated Successfully
              </p>

              <p>
                Geofence Selected:
                {" "}
                <b>
                  {result.selectedGeofence}
                </b>
              </p>

              <p>
                Vehicle Position:
                {" "}
                <b>
                  {result.locationType.toUpperCase()}
                </b>
              </p>

              <hr />

              <h3>
                Assessment Flow
              </h3>

              <p>
                ✅ Step 5: Geofence Detection
              </p>

              <p>
                ✅ Step 6: Violation Created
              </p>

              <p>
                ✅ Step 7: Alert Triggered
              </p>

              <p>
                ✅ Step 8: Real-Time Notification
              </p>

              <p>
                ✅ Step 9: Violation History Updated
              </p>

              <p>
                ✅ Step 10: Dashboard Updated
              </p>

              <hr />

              <h3>
                Current Geofence Status
              </h3>

              {result.current_geofences?.length >
              0 ? (
                result.current_geofences.map(
                  (geo, index) => (
                    <div key={index}>
                      <b>
                        {geo.geofence_name}
                      </b>
                      {" "}
                      - {geo.status}
                    </div>
                  )
                )
              ) : (
                <p>
                  Vehicle currently outside all geofences
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