import { Container } from "react-bootstrap";
import LemonYellow from "./blog.details.LemonYellow";
import NavBar from "../../NavBar/app.navbar";
import AppFooter from "../../Footer/app.footer";
import RegisterInformation from "../../Home/RegisterInformation/app.register.information";
import BlogCategory from "../app.blog.category";
import "./blog.detail.css";
import BlogComment from "./blog.comment";
import Organlife from "./blog.details.Organlife";
import Nutricare from "./blog.details.nutricare";
import OtChuong from "./blog.details.Otchuong";
const BlogDetails = () => {
  // This component is used to display the details of a blog post
  const displayBlogDetailsOptions = () => {
    const blogId = localStorage.getItem("numberBlog");
    console.log(blogId);
    if (blogId === "68879e22b31ed004381b14dc") {
      return <LemonYellow />;
    } else if (blogId === "6887a20865890c736a50c9ee") {
      return <Organlife />;
    } else if (blogId === "6887a08039af9a6bf8acb235") {
      return <Nutricare />;
    } else if (blogId === "6887a3c265890c736a50cb8c") {
      return <OtChuong />;
    } else {
      return <div>Blog details not found</div>;
    }
  };

  return (
    <div>
      <Container>
        <NavBar />
      </Container>
      <div>
        <Container className="blog-details-wrapper">
          {displayBlogDetailsOptions()}
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
