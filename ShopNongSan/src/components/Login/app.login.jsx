import { Button, Container, Form } from "react-bootstrap";
import "./app.login.css";
import { Link, useNavigate } from "react-router";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import AppFooter from "../Footer/app.footer";
import NavBar from "../NavBar/app.navbar";
import { useState } from "react";
import { useEffect } from "react";
import { notification } from "antd";

const AppLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message: message,
      placement: "topRight",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/api/client/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        openNotification("success", result.message);
        setTimer(300);
        setStep(2);
      } else {
        openNotification("error", result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_DATABASE_URL}/api/client/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
        credentials: "include",
      }
    );
    const result = await response.json();
    if (response.status === 200) {
      openNotification("success", result.message);
      navigate("/");
      clearForm();
      window.location.reload();
    } else if (response.status === 400) {
      openNotification("error", result.message);
    }
  };

  // Đếm ngược timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      openNotification("error", "Mã OTP đã hết hạn.");
    }
  }, [timer]);

  const clearForm = () => {
    setEmail("");
    setPassword("");
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
        {step === 1 && (
          <Form>
            <p>ĐĂNG NHẬP</p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="d-flex mb-3 justify-content-between"
              controlId="formBasicCheckbox"
            >
              <Form.Check type="checkbox" label="Ghi nhớ tôi" />
              <Link to={"/forgot-password"} className="text-muted">
                Quên mật khẩu?
              </Link>
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100 "
              onClick={handleSubmit}
            >
              Đăng nhập
            </Button>
            <Form.Text className="text-muted d-flex justify-content-center gap-1">
              Bạn chưa có tài khoản? {""}
              <Link to={"/account/register"} className="text-muted">
                Đăng ký tại đây
              </Link>
            </Form.Text>
          </Form>
        )}

        {step === 2 && (
          <Form>
            <p>NHẬP MÃ OTP</p>
            <Form.Group className="mb-3" controlId="formBasicOTP">
              <Form.Control
                type="text"
                placeholder="Nhập mã OTP đã gửi vào email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className="otp-timer">
                Mã của bạn có hiệu lực trong: <span>{timer} giây</span>
              </div>
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100 "
              onClick={handleOtpSubmit}
            >
              Xác nhận
            </Button>
          </Form>
        )}
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

export default AppLogin;
