import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#1A1B2F",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2 style={{ color: "#FFCF95" }}>MapU</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          marginTop: "40px",
        }}
      >
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/vehicles" style={linkStyle}>Vehicles</Link>
        <Link to="/geofences" style={linkStyle}>Geofences</Link>
        <Link to="/tracking" style={linkStyle}>Tracking</Link>
        <Link to="/violations" style={linkStyle}>Violations</Link>
        <Link to="/alerts" style={linkStyle}>Alerts</Link>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
};

export default Sidebar;