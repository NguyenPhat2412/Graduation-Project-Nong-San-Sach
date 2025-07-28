import { useEffect, useState } from "react";
import "./home.latestNews.css";
import { Link } from "react-router";
const LatestNews = () => {
  const [news, setNews] = useState([]);

  // Fetch latest news data from database
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/news`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch latest news");
        }
        setNews(data);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };
    fetchLatestNews();
  }, []);

  return (
    <div className="latest-news-section">
      <div>
        <h1>Latest News</h1>
      </div>
      <div className="latest-news-container">
        {news.map((item) => (
          <div className="latest-news" key={item._id}>
            <div className="latest-news-image">
              <img
                src={`${import.meta.env.VITE_DATABASE_URL}${item.banner}`}
                alt="News"
              />
            </div>

            <div className="latest-news-content">
              <div>
                <i class="fa-solid fa-comment"></i>
                <p>{item.numberComment}</p>
              </div>
              <div>
                <i class="fa-solid fa-user-tag"></i>
                <p>{item.author}</p>
              </div>
              <div>
                <i class="fa-solid fa-tag"></i>
                <p>{item.category}</p>
              </div>
            </div>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <Link
              className="nav-link text-success text-decoration-underline"
              to={`/news/${item._id}`}
            >
              Read more <i class="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
