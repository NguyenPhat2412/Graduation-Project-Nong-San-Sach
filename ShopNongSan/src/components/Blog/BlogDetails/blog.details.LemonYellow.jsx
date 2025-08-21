import { useEffect, useState } from "react";
import "./blog.details.LemonYellow.css";
const LemonYellow = () => {
  const [data, setData] = useState(null);
  // fetch data blog
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/blogs/68879e22b31ed004381b14dc`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    fetchBlogDetails();
  }, []);
  return (
    <div className="blog-details-container">
      <img
        src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/LemonYellow/chanh_vang_1_21656fd829.jpg`}
        alt="Lemon Yellow"
        className="blog-header-image"
      />
      <div className="blog-details-content">
        <div className="blog-details-meta">
          <i className="fa-solid fa-tag"></i>
          <p>{data?.category}</p>
        </div>
        <div className="blog-details-meta">
          <i className="fa-solid fa-user-tag"></i>
          <p>{data?.author}</p>
        </div>
        <div className="blog-details-meta">
          <i className="fa-solid fa-comment"></i>
          <p>{data?.numberComment} Comments</p>
        </div>
      </div>
      <div className="blog-title">
        <p>{data?.title}</p>
      </div>
      <div className="blog-author-block">
        <img
          src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/LemonYellow/gia_an_author.png`}
          alt="Author"
          className="blog-author-image"
        />
        <p>{data?.author}</p>
        <p>{data?.date}</p>
      </div>
      <div className="blog-section-content">
        <p>{data?.content}</p>
      </div>
      <div className="blog-section-title">
        <p>{data?.title_1}</p>
        <p>{data?.content_1}</p>
      </div>
      <img
        src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/LemonYellow/chanh_vang_2_62e84aef01.jpg`}
        alt="Lemon Yellow"
        className="blog-section-image"
      />
      <div className="blog-section-title">
        <p>{data?.title_2}</p>
        <p>{data?.content_2}</p>
      </div>
      <img
        src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/LemonYellow/chanh_vang_3ad30c07e4.png`}
        alt="Lemon Yellow"
        className="blog-section-image"
      />
      <div className="blog-section-title">
        <p>{data?.title_3}</p>
        <p>{data?.content_3}</p>
      </div>

      <img
        src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/LemonYellow/chanh_vang_6_2ed26b99b1 (1).jpg`}
        alt="Lemon Yellow"
        className="blog-section-image"
      />
    </div>
  );
};

export default LemonYellow;
