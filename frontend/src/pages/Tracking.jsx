import MainLayout from "../layouts/MainLayout";

function Tracking() {
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
          height: "500px",
          background: "#FFF0D9",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        Map Coming Next
      </div>
    </MainLayout>
  );
}

export default Tracking;