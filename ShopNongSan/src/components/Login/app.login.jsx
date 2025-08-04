import { Button, Container, Form } from "react-bootstrap";
import "./app.login.css";
import { Link, useNavigate } from "react-router";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import AppFooter from "../Footer/app.footer";
import NavBar from "../NavBar/app.navbar";
import { useState } from "react";
import { useNotification } from "../../UseContext/NotificationContext";

const AppLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { setType, setMessage } = useNotification();

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
      if (!response.ok) {
        throw new Error("Login failed");
      }

      if (email === "" || password === "") {
        setError(true);
        return;
      }
      clearForm();
      setType("success");
      setMessage("Đăng nhập thành công!");
      setError(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error during login:", error);
      setError(true);
    }
  };
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setError(false);
  };
  return (
    <>
      <Container>
        <NavBar />
      </Container>
      <img
        src={`${import.meta.env.VITE_DATABASE_URL}/public/Image/Login/Breadcrumbs (1).png`}
        alt="Logo"
      ></img>
      <Container className="login-container">
        <Form>
          <p>ĐĂNG NHẬP</p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <div className="error-message-login">
                Email không được để trống
              </div>
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
              <div className="error-message-login">
                Mật khẩu không được để trống
              </div>
            )}
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
