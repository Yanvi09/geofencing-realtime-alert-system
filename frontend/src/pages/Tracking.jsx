import MainLayout from "../layouts/MainLayout";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function Tracking() {
  const vehiclePosition = [37.7749, -122.4194];

  const geofence = [
    [37.7749, -122.4194],
    [37.7849, -122.4194],
    [37.7849, -122.4094],
    [37.7749, -122.4094],
  ];

  return (
    <MainLayout>
      <h1
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        Live Tracking
      </h1>

      <div
        style={{
          height: "600px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={vehiclePosition}
          zoom={14}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={vehiclePosition}>
            <Popup>
              Vehicle KA-01-AB-1234
            </Popup>
          </Marker>

          <Polygon positions={geofence}>
            <Popup>
              Downtown Zone
            </Popup>
          </Polygon>
        </MapContainer>
      </div>
    </MainLayout>
  );
}

export default Tracking;