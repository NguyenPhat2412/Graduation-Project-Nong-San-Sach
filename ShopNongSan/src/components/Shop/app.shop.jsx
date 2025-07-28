import { Container } from "react-bootstrap";
import CategoryProduct from "./shop.category";
import NavBar from "../NavBar/app.navbar";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import AppFooter from "../Footer/app.footer";
import ListProduct from "./shop.listProduct";
import "./app.shop.css";

const AppShop = () => {
  return (
    <>
      <Container>
        <NavBar />
      </Container>
      <img
        src="../../../public/Image/Login/Breadcrumbs (1).png"
        alt="Logo"
      ></img>
      <Container>
        <div className="shop-container-section">
          <CategoryProduct />
          <ListProduct />
        </div>
      </Container>

      <div className="register-information-section">
        <Container>
          <RegisterInformation />
        </Container>
      </div>
      <AppFooter />
    </>
  );
};

export default AppShop;
