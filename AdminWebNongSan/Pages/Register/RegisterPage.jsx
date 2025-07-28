import { useState } from "react";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!email || !password || !name) {
      setError("You must fill in all fields!");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
    }

    const userData = {
      name: name,
      email,
      password,
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          alert("Đăng ký thành công!");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Đã xảy ra lỗi, vui lòng thử lại sau.");
      });
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-box">
          <h1 className="register-title">Sign Up</h1>
          <input
            placeholder="Full Name"
            type="text"
            className="register-input"
            value={name}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="register-error">{error}</p>}
          <button className="register-button" onClick={handleSignUp}>
            Sign Up
          </button>
          <div className="register-footer">
            Login?{" "}
            <Link to="/login" className="register-link">
              Click
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
