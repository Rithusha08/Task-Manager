import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 20px",
      background: "#1e293b",
      color: "white",
      borderRadius: "10px",
      marginBottom: "20px"
    }}>
      <div>Team Manager</div>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
        <Link to="/projects" style={{ color: "white" }}>Projects</Link>
        <Link to="/tasks" style={{ color: "white" }}>Tasks</Link>
      </div>
    </div>
  );
}

export default Navbar;