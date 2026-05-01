import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    // 🔥 STORE EVERYTHING
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("user_id", res.data.user_id);

    alert("Login successful");

    window.location.href = "/dashboard";
  } catch (err) {
    console.log(err.response?.data);
    alert("Login failed");
  }
};
  return (

    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>
     
      <>
      <Navbar />
      <h1>NavBar</h1>
    </>
   
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;