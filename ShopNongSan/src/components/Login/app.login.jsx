import { Button, Container, Form } from "react-bootstrap";
import "./app.login.css";
import { Link, useNavigate } from "react-router";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import AppFooter from "../Footer/app.footer";
import NavBar from "../NavBar/app.navbar";
import { useState } from "react";
const AppLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
      const data = await response.json();
      console.log("Login successful:", data);

      if (email === "" || password === "") {
        setError(true);
        return;
      }
      clearForm();
      alert("Login successful!");
      setError(false);
      navigate("/");
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
        src="../../../public/Image/Login/Breadcrumbs (1).png"
        alt="Logo"
      ></img>
      <Container className="login-container">
        <Form>
          <p>LOGIN PAGE</p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div className="error-message">Email is required</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="error-message">Password is required</div>}
          </Form.Group>
          <Form.Group
            className="d-flex mb-3 justify-content-between"
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Check me out" />
            <Link to={"/forgot-password"} className="text-muted">
              Forget Password
            </Link>
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            className="w-100 "
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Form.Text className="text-muted d-flex justify-content-center gap-1">
            Don't have an account?{" "}
            <Link to={"/account/register"} className="text-muted">
              Register here
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
