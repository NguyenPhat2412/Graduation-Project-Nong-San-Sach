import { useState } from "react";
import "./blog.comment.css";
import { useUser } from "../../../UseContext/UserContext";
import { Link } from "react-router";

const BlogComment = () => {
  const [comments, setComments] = useState("");
  const { userInfo } = useUser();
  const [name, setName] = useState(userInfo?.username || "");
  const [email, setEmail] = useState(userInfo?.email || "");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comments.trim()) {
      alert("Please enter a comment.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/api/client/blogs/68879e22b31ed004381b14dc/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: comments,
            userId: userInfo._id,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit comment");

      const data = await response.json();
      console.log("Comment submitted successfully:", data);
      setComments("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again later.");
    }
  };

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
    <div className="blog-comment-container">
      <h3 className="comment-title">Leave a Comment</h3>
      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <div className="comment-user-info">
          <input type="text" value={name} disabled placeholder="Your Name" />
          <input type="email" value={email} disabled placeholder="Your Email" />
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
  );
};

export default BlogComment;
