import { Container } from "react-bootstrap";
import LemonYellow from "./blog.details.LemonYellow";
import NavBar from "../../NavBar/app.navbar";
import AppFooter from "../../Footer/app.footer";
import RegisterInformation from "../../Home/RegisterInformation/app.register.information";
import BlogCategory from "../app.blog.category";
import "./blog.detail.css";
import BlogComment from "./blog.comment";
const BlogDetails = () => {
  return (
    <div>
      <Container>
        <NavBar />
      </Container>
      <div>
        <Container className="blog-details-wrapper">
          <LemonYellow />
          <div className="blog-details-category">
            <BlogCategory />
          </div>
          <BlogComment />
        </Container>
      </div>

      <Container>
        <RegisterInformation />
      </Container>
      <div>
        <AppFooter />
      </div>
    </div>
  );
};

export default BlogDetails;
