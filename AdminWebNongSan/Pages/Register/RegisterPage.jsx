import { useState } from "react";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";

const SignUpPage = () => {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message) => {
    api[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const handleSignUp = () => {
    if (!email || !password || !name) {
      openNotification("error", "You must fill in all fields!");
      return;
    }
    if (password.length < 8) {
      openNotification("error", "Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }
    if (password !== currentPassword) {
      openNotification("error", "Mật khẩu không khớp!");
      return;
    }

    const userData = {
      username: name,
      email,
      password,
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          openNotification("error", data.error);
        } else {
          openNotification("success", "Đăng ký thành công!");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        openNotification("error", "Đã xảy ra lỗi, vui lòng thử lại sau.");
      });
  };

  return (
    <div className="register-container">
      {contextHolder}
      <div className="register-header">
        <p>Chào mừng đến với trang quản lý web nông sản của chúng tôi!</p>
      </div>
      <div className="register-wrapper">
        <div className="register-box">
          <h1 className="register-title">Đăng ký</h1>
          <input
            placeholder="Họ và tên"
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
            placeholder="Mật khẩu"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="register-input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button className="register-button" onClick={handleSignUp}>
            Đăng ký
          </button>
          <div className="register-footer">
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="register-link">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
