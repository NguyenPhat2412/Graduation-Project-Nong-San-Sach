import { useEffect, useState } from "react";
import NavBar from "../NavBar/app.navbar";
import { Container } from "react-bootstrap";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import AppFooter from "../Footer/app.footer";
import "./app.404.css";
import { Link } from "react-router";

const App404 = () => {
  const [dataError, setDataError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/error/404`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch error data");
        }
        const data = await response.json();
        console.log(data);
        setDataError(...data);
      } catch (error) {
        console.error("Error fetching error data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <Container>
          <NavBar />
        </Container>
      </div>
      <Container className="app-404-container">
        <main>
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}${dataError?.img404}`}
            alt="404 Not Found"
          />
          <div className="error-message">Oops! Page not found.</div>
          <div className="back-to-home">
            <Link className="nav-link" to={"/"}>
              Back to Home
            </Link>
          </div>
        </main>
      </Container>
      <div className="register-information-section">
        <Container>
          <RegisterInformation />
        </Container>
      </div>
      <AppFooter />
    </div>
  );
};

export default App404;
