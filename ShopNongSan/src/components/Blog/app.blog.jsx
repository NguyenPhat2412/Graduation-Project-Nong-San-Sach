import { Container } from "react-bootstrap";
import NavBar from "../NavBar/app.navbar";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import BlogCategory from "./app.blog.category";
import ListBlog from "./app.blog.ListBlog";
import AppFooter from "../Footer/app.footer";
import "./app.blog.css";
const AppBlog = () => {
  return (
    <>
      <Container>
        <NavBar />
      </Container>
      <div>
        <img
          src="../../../public/Image/Login/Breadcrumbs (1).png"
          alt="Logo"
        ></img>
      </div>
      <Container className="blog-container-main">
        <BlogCategory />
        <ListBlog />
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

export default AppBlog;
