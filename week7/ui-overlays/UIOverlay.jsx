export default function UIOverlay() {
  return (
    <div style={{ padding: "20px" }}>
      <h3>ℹ️ UI Overlay Example</h3>

      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <button style={{ padding: "8px 12px" }}>
          Hover me
        </button>

        <div
          style={{
            position: "absolute",
            top: "110%",
            left: "0",
            backgroundColor: "#333",
            color: "#fff",
            padding: "8px",
            borderRadius: "6px",
            fontSize: "12px",
            width: "180px",
            display: "none",
          }}
          className="overlay"
        >
          This overlay provides additional information.
        </div>
      </div>
    </div>
  );
}
