import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./app.blog.listBlog.css";
import { Pagination } from "antd";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalBlogs = blogs.length;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/blogs`
        );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="list-blog-wrapper">
      <div className="blog-container">
        {paginatedBlogs.map((item) => (
          <div className="blog-item" key={item._id}>
            <div className="blog-image">
              <img
                src={`${import.meta.env.VITE_DATABASE_URL}${item.banner}`}
                alt={item.title}
              />
            </div>

            <div className="blog-content">
              <div className="blog-meta">
                <i className="fa-solid fa-comment"></i>
                <p>{item.numberComment} Comments</p>
              </div>
              <div className="blog-meta">
                <i className="fa-solid fa-user-tag"></i>
                <p>{item.author}</p>
              </div>
              <div className="blog-meta">
                <i className="fa-solid fa-tag"></i>
                <p>{item.category}</p>
              </div>
            </div>

            <h4 className="blog-item-title">{item.title}</h4>

            <Link className="read-more-link" to={`${item.links}`}>
              Read more <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={totalBlogs}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default ListBlog;
