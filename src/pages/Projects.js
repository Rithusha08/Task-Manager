import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const role = localStorage.getItem("role")?.trim();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");   // 🔥 FIX

  // 🔥 Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  // 🔥 Add project
  const addProject = async () => {
    if (!name.trim()) {
      alert("Project name required");
      return;
    }

    if (!userId) {
      alert("User not logged in properly");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/projects",
        {
          name,
          description: "Demo project",
          created_by: parseInt(userId)   // ✅ FIXED
        },
        {
          headers: {
            Authorization: token || ""
          }
        }
      );

      console.log("CREATED:", res.data);

      setName("");
      fetchProjects();

    } catch (err) {
      console.log("CREATE ERROR:", err.response?.data || err.message);
      alert("Failed to create project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h2>Projects</h2>

      {/* 🔥 Admin UI */}
      {role === "admin" ? (
        <>
          <input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={addProject}>Add</button>
        </>
      ) : (
        <p style={{ color: "gray" }}>
          Only admin can create projects
        </p>
      )}

      <ul style={{ marginTop: "20px" }}>
    {projects.length === 0 ? (
    <p>No projects yet</p>
    ) : (
    projects.map((p) => (
      <li key={p.id} style={{
        background: "white",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "10px",
        boxShadow: "0 3px 8px rgba(0,0,0,0.05)"
      }}>
        <strong>{p.name}</strong>
        <p style={{ margin: 0, color: "gray" }}>{p.description}</p>
      </li>
        ))
    )}
    </ul>
    </div>
  );
}

export default Projects;