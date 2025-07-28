import { Button, Container, Form } from "react-bootstrap";
import "./app.register.css";
import { Link, useNavigate } from "react-router";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import AppFooter from "../Footer/app.footer";
import NavBar from "../NavBar/app.navbar";
import { useState } from "react";
const AppRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post registration data to the server or perform validation
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
      console.log("Registration successful:", data);

      if (password !== confirmPassword) {
        setError(true);
        alert("Passwords do not match");
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
      alert("Registration successful!");
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
      <Container>
        <NavBar />
      </Container>
      <img
        src="../../../public/Image/Login/Breadcrumbs (1).png"
        alt="Logo"
      ></img>
      <Container className="login-container">
        <Form>
          <p>REGISTER PAGE</p>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && <div className="error-message">Name is required</div>}
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && (
              <div className="error-message">Confirm Password is required</div>
            )}
          </Form.Group>
          <Form.Group
            className="d-flex mb-3 justify-content-between"
            controlId="formBasicCheckbox"
          >
            <Form.Check
              type="checkbox"
              label="I agree to the terms and conditions"
            />
          </Form.Group>
          <Button variant="success" className="w-100" onClick={handleSubmit}>
            Register
          </Button>
          <Form.Text className="text-muted d-flex justify-content-center gap-1">
            Already have an account?{" "}
            <Link to={"/account/login"} className="text-muted">
              Login here
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
