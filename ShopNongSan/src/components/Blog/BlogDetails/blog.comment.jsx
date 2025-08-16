import { useEffect, useState } from "react";
import "./blog.comment.css";
import { useUser } from "../../../UseContext/UserContext";
import { Link } from "react-router";
import { notification } from "antd";

const BlogComment = () => {
  const [comments, setComments] = useState("");
  const [commentList, setCommentList] = useState([]);
  const { userInfo } = useUser();
  const [name, setName] = useState(userInfo?.username || "");
  const [email, setEmail] = useState(userInfo?.email || "");

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message: "Thông báo",
      description: message,
    });
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comments.trim()) {
      openNotification("error", "Please enter a comment.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/api/client/blog/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: comments,
            userId: userInfo?._id,
            blogId: "68879e22b31ed004381b14dc",
            avatar: userInfo?.avatar || "",
            name: userInfo?.username || "",
            email: userInfo?.email || "",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit comment");
      openNotification("success", "Comment submitted successfully!");
      setComments("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      openNotification(
        "error",
        "Failed to submit comment. Please try again later."
      );
    }
  };

  // get comments by blogId
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/blog/comments/68879e22b31ed004381b14dc`
        );
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        setCommentList(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setCommentList([]);
      }
    };
    fetchComments();
  }, []);
  if (!userInfo) {
    return (
      <div className="blog-comment-container">
        <h3 className="comment-title">Comments</h3>
        <Link className="comment-login-link" to="/account/login">
          Please login to comment.
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-comment-wrapper">
      <div className="blog-comment-container">
        {contextHolder}
        <h3 className="comment-title">Leave a Comment</h3>
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <div className="comment-user-info">
            <input type="text" value={name} disabled placeholder="Your Name" />
            <input
              type="email"
              value={email}
              disabled
              placeholder="Your Email"
            />
          </div>
          <textarea
            className="comment-textarea"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Write your comment here..."
            rows="4"
          ></textarea>
          <button className="comment-submit-btn" type="submit">
            Submit Comment
          </button>
        </form>

        {/* Display Comments
      <div>
        <h4 className="comment-list-title">Comments</h4>
        <ul className="comment-list">
          <li className="comment-item">
            <p>
              <strong>{name}</strong>: {comments}
            </p>
          </li>
        </ul>
      </div> */}
      </div>
      <div className="comment-list-container">
        <h4 className="comment-list-title">Comments</h4>
        <ul className="comment-list">
          {commentList.map((comment) => (
            <li className="comment-item" key={comment._id}>
              <div>
                <img
                  src={`${import.meta.env.VITE_DATABASE_URL}${comment.avatar}`}
                  alt={comment.name}
                />
                <strong>{comment.name}</strong>: {comment.comment}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogComment;
