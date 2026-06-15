import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        background: "#0F1221",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
          width: "100%",
        }}
      >
        <Navbar />

        <div
          style={{
            padding: "25px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;