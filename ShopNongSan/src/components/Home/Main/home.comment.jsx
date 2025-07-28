import { useEffect, useState } from "react";
import "./home.comment.css";
const HomeComment = () => {
  const [comment, setComment] = useState([]);

  // Fetch data comment from database
  useEffect(() => {
    const fetchDataComment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/comment`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        setComment(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchDataComment();
  }, []);
  return (
    <div className="home-comment-wrapper">
      <div className="home-comment-header">
        <h2>Client Testimonials</h2>
      </div>
      <div className="home-comment-container">
        {comment.map((item) => (
          <div className="home-comment" key={item._id}>
            <div className="home-comment-logo">
              <img
                src={`${import.meta.env.VITE_DATABASE_URL}/${item.img}`}
                alt="Logo"
              />
            </div>

            <div className="home-comment-content">
              <p className="home-comment-text">{item.content}</p>
              <div className="home-comment-author">
                <div className="home-comment-avatar">
                  <img
                    src={`${import.meta.env.VITE_DATABASE_URL}/${item.avatar}`}
                    alt="Avatar"
                  />
                </div>
                <div className="home-comment-info">
                  <p className="home-comment-name">{item.name}</p>
                  <p className="home-comment-position">{item.position}</p>
                </div>
                <div className="home-comment-star">
                  <p>
                    {Array.from({ length: item.rating }, (_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeComment;
