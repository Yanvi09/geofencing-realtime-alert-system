function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#1A1B2F",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
        borderBottom: "1px solid #2d3155",
      }}
    >
      <h3>Geofencing Real-Time Alert System</h3>

      <div
        style={{
          background: "#723EC3",
          padding: "8px 16px",
          borderRadius: "8px",
        }}
      >
        Live
      </div>
    </div>
  );
}

export default Navbar;