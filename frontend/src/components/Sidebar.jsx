import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#11152F",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#FFCF95",
          marginBottom: "50px",
        }}
      >
        MapU
      </h1>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: "white",
            textDecoration: "none",
            padding: "14px",
            borderRadius: "12px",
            background: isActive ? "#723EC3" : "transparent",
          })}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/vehicles"
          style={({ isActive }) => ({
            color: "white",
            textDecoration: "none",
            padding: "14px",
            borderRadius: "12px",
            background: isActive ? "#723EC3" : "transparent",
          })}
        >
          Vehicles
        </NavLink>

        <NavLink
          to="/geofences"
          style={({ isActive }) => ({
            color: "white",
            textDecoration: "none",
            padding: "14px",
            borderRadius: "12px",
            background: isActive ? "#723EC3" : "transparent",
          })}
        >
          Geofences
        </NavLink>

        <NavLink
          to="/tracking"
          style={({ isActive }) => ({
            color: "white",
            textDecoration: "none",
            padding: "14px",
            borderRadius: "12px",
            background: isActive ? "#723EC3" : "transparent",
          })}
        >
          Tracking
        </NavLink>

        <NavLink
          to="/violations"
          style={({ isActive }) => ({
            color: "white",
            textDecoration: "none",
            padding: "14px",
            borderRadius: "12px",
            background: isActive ? "#723EC3" : "transparent",
          })}
        >
          Violations
        </NavLink>

        <NavLink
          to="/alerts"
          style={({ isActive }) => ({
            color: "white",
            textDecoration: "none",
            padding: "14px",
            borderRadius: "12px",
            background: isActive ? "#723EC3" : "transparent",
          })}
        >
          Alerts
        </NavLink>
      </nav>
    </div>
  );
}