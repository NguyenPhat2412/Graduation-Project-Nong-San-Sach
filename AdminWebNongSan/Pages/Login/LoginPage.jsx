import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!email || !password) {
      setError("You must fill in all fields!");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const userData = { email, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        alert("Đăng nhập thành công!");

        localStorage.setItem("currentUser", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-box">
          <h1 className="login-title">Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="login-error">{error}</p>}
          <button className="login-button" onClick={handleLogin}>
            SIGN IN
          </button>
          <div className="login-footer">
            Create an account?{" "}
            <Link to="/register" className="login-link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
