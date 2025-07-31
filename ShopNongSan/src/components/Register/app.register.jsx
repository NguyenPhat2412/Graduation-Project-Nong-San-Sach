import { Button, Container, Form } from "react-bootstrap";
import "./app.register.css";
import { Link, useNavigate } from "react-router";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import AppFooter from "../Footer/app.footer";
import NavBar from "../NavBar/app.navbar";
import { useState } from "react";
import { notification } from "antd";
const AppRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message) => {
    api[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/api/client/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email,
            password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const data = await response.json();
      if (password !== confirmPassword) {
        setError(true);
        openNotification("error", "Passwords do not match");
        return;
      }
      if (
        email === "" ||
        password === "" ||
        confirmPassword === "" ||
        name === ""
      ) {
        setError(true);
        return;
      }
      clearForm();
      openNotification("success", "Registration successful!");
      setError(false);
      navigate("/account/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(true);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(false);
  };

  return (
    <>
      {contextHolder}
      <Container>
        <NavBar />
      </Container>
      <img
        src={`${import.meta.env.VITE_DATABASE_URL}/public/Image/Login/Breadcrumbs (1).png`}
        alt="Logo"
      ></img>
      <Container className="login-container">
        <Form>
          <p>ĐĂNG KÝ</p>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && (
              <div className="error-message">Tên không được để trống</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <div className="error-message">Email không được để trống</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="error-message">Mật khẩu không được để trống</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Nhập lại mật khẩu của bạn"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && (
              <div className="error-message">
                Mật khẩu xác nhận không được để trống
              </div>
            )}
          </Form.Group>
          <Form.Group
            className="d-flex mb-3 justify-content-between"
            controlId="formBasicCheckbox"
          >
            <Form.Check
              type="checkbox"
              label="Tôi đồng ý với các điều khoản và điều kiện"
            />
          </Form.Group>
          <Button variant="success" className="w-100" onClick={handleSubmit}>
            Đăng ký
          </Button>
          <Form.Text className="text-muted d-flex justify-content-center gap-1">
            Bạn đã có tài khoản?{" "}
            <Link to={"/account/login"} className="text-muted">
              Đăng nhập tại đây
            </Link>
          </Form.Text>
        </Form>
      </Container>
      <Container>
        <RegisterInformation />
      </Container>
      <div>
        <AppFooter />
      </div>
    </>
  );
};

export default AppRegister;
