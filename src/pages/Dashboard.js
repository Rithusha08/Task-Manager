import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h3>Total Tasks</h3>
          <p>10</p>
        </div>

        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h3>Completed</h3>
          <p>5</p>
        </div>

        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h3>Pending</h3>
          <p>3</p>
        </div>

        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h3>Overdue</h3>
          <p>2</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;