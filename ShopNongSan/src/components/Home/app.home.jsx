import { Container } from "react-bootstrap";
import NavBar from "../NavBar/app.navbar";
import HomeMain from "./Main/home.main";
import AppFooter from "../Footer/app.footer";
import HomeComment from "./Main/home.comment";
import "./app.home.css";
import RegisterInformation from "./RegisterInformation/app.register.information";
import LatestNews from "./Main/home.latestNews";
import FeatureProduct from "./Main/home.featuredProduct";
import { useEffect } from "react";
const AppHome = () => {
  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Container>
        <NavBar />
        <HomeMain />
      </Container>
      <div>
        <Container>
          <FeatureProduct />
        </Container>
      </div>
      <div>
        <Container>
          <LatestNews />
        </Container>
      </div>
      <div className="home-comment-section">
        <Container>
          <HomeComment />
        </Container>
      </div>
      <div className="register-information-section">
        <Container>
          <RegisterInformation />
        </Container>
      </div>
      <AppFooter />
    </>
  );
};

export default AppHome;
