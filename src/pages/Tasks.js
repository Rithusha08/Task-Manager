import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const role = localStorage.getItem("role")?.trim();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const [projectId, setProjectId] = useState(null);

  // 🔥 Load projects + tasks together (FIXED)
  useEffect(() => {
    const loadData = async () => {
      try {
        const projectRes = await axios.get("http://localhost:5000/projects");
        const projects = projectRes.data;

        if (projects.length > 0) {
          const pid = projects[0].id;
          setProjectId(pid);

          const taskRes = await axios.get(
            `http://localhost:5000/tasks/${pid}`
          );

          setTasks(Array.isArray(taskRes.data) ? taskRes.data : []);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.log("LOAD ERROR:", err);
        setTasks([]);
      }
    };

    loadData();
  }, []);

  // 🔥 Add task
  const addTask = async () => {
    if (!title.trim()) {
      alert("Task title required");
      return;
    }

    if (!projectId) {
      alert("Create a project first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/tasks",
        {
          title,
          project_id: projectId,
          assigned_to: parseInt(userId)
        },
        {
          headers: {
            Authorization: token || ""
          }
        }
      );

      setTitle("");

      // refresh tasks
      const res = await axios.get(
        `http://localhost:5000/tasks/${projectId}`
      );
      setTasks(Array.isArray(res.data) ? res.data : []);

    } catch (err) {
      console.log("TASK ERROR:", err.response?.data || err.message);
      alert("Failed to create task");
    }
  };

  // 🔥 Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { status });

      const res = await axios.get(
        `http://localhost:5000/tasks/${projectId}`
      );
      setTasks(Array.isArray(res.data) ? res.data : []);

    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  // ✅ SAFE FILTERS (FIXED)
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const todo = safeTasks.filter(
    (t) => t.status?.toLowerCase() === "todo"
  );

  const inprogress = safeTasks.filter(
    (t) => t.status?.toLowerCase() === "inprogress"
  );

  const done = safeTasks.filter(
    (t) => t.status?.toLowerCase() === "done"
  );

  // ✅ FIXED RETURN (THIS WAS MISSING BEFORE)
  return (
    <div style={{ padding: "30px" }}>
      <Navbar />

      <h2 style={{ marginBottom: "20px" }}>Task Board</h2>

      {/* Admin Input */}
      {role === "admin" && (
        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      )}

      {/* Board */}
      <div style={{ display: "flex", gap: "20px" }}>
        {[
          { title: "To Do", data: todo },
          { title: "In Progress", data: inprogress },
          { title: "Done", data: done }
        ].map((col, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              background: "white",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{col.title}</h3>

            {col.data.length === 0 ? (
              <p style={{ color: "gray" }}>No tasks</p>
            ) : (
              col.data.map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: "#f9fafb",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span>{t.title}</span>

                  {col.title !== "Done" && (
                    <button
                      style={{ fontSize: "12px", padding: "5px 10px" }}
                      onClick={() =>
                        updateStatus(
                          t.id,
                          col.title === "To Do" ? "inprogress" : "done"
                        )
                      }
                    >
                      →
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;