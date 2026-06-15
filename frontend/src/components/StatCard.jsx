function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#FFF0D9",
        borderRadius: "16px",
        padding: "24px",
        minHeight: "120px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <h3
        style={{
          color: "#555",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: "#723EC3",
          margin: 0,
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;