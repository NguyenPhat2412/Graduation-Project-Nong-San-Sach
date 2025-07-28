import { useEffect, useState } from "react";
import "./app.blog.category.css";

const BlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await Promise.all([
        fetch(`${import.meta.env.VITE_DATABASE_URL}/api/client/categories`),
        fetch(`${import.meta.env.VITE_DATABASE_URL}/api/client/blog/tags`),
        fetch(`${import.meta.env.VITE_DATABASE_URL}/api/client/blogs`),
      ]);
      const [categoriesData, tagsData, blogData] = await Promise.all(
        response.map((res) => res.json())
      );
      setCategories(categoriesData);
      setTags(tagsData);
      setBlogData(blogData.length > 3 ? blogData.slice(0, 3) : blogData);
    };
    fetchCategories();
  }, []);

  return (
    <div className="blog-category-container">
      {/* Search */}
      <div className="blog-category-input">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search..." />
      </div>

      {/* Danh mục blog */}
      <div className="blog-category-list">
        <h5>Categories</h5>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <a href={`/app/blog/category/${category.id}`}>{category.name}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tags */}
      <div className="blog-tags">
        <h5>Popular Tags</h5>
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Our Gallery */}
      <div className="blog-gallery">
        <h5>Our Gallery</h5>
        <div className="gallery-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="gallery-item">
              <img
                src={`${import.meta.env.VITE_DATABASE_URL}/public/OurGallery/gallery-${index + 1}.png`}
                alt={`Gallery ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Blog */}
      <div className="blog-recent">
        <h5>Recent Blog</h5>
        {blogData.map((blog) => (
          <div key={blog.id} className="blog-item-recent">
            <h6>{blog.title}</h6>
            <p>{blog.excerpt}</p>
            <a href={`/app/blog/${blog.id}`}>Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCategory;
