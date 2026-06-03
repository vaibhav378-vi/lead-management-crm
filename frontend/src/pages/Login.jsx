import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "vaibhavbansal378@gmail.com" &&
      password === "vaibhav123"
    ) {
      localStorage.setItem("crmUser", email);

      window.location.href = "/";
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h2>Lead CRM Login</h2>

        <p>
          Welcome back Admin 👋
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <div className="login-info">
          <p>Email: vaibhavbansal378@gmail.com</p>
          <p>Password: vaibhav123</p>
        </div>

      </div>

    </div>
  );
};

export default Login;