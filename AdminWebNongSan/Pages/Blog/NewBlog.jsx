import { useState } from "react";
import NavBar from "../../components/NavBar/navbar";
import "./NewBlog.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [banner, setBanner] = useState("");
  const [numberComments, setNumberComments] = useState("");
  const [links, setLinks] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setBanner(Array.from(e.target.files));
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      description: "Thông báo",
      message: message,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !content ||
      !category ||
      !author ||
      !tags ||
      !title ||
      !date ||
      !errors ||
      !links
    ) {
      setErrors({
        content: !content ? "Content is required" : "",
        category: !category ? "Category is required" : "",
        author: !author ? "Author is required" : "",
        tags: !tags ? "Tags are required" : "",
        title: !title ? "Title is required" : "",
        date: !date ? "Date is required" : "",
        errors: "Please fill in all fields",
        links: !links ? "Links are required" : "",
      });
      return;
    }
    setErrors({});

    try {
      const formData = new FormData();
      for (let i = 0; i < banner.length; i++) {
        formData.append("images", banner[i]);
      }

      const uploadResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/upload-multiple`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Failed to upload image");
      }
      const imageUrl = uploadData.filePaths;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            date,
            content,
            author,
            tags,
            category,
            banner: imageUrl,
            numberComments: numberComments,
            links,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create blog");
      }
      openNotification("success", "Tạo bài viết thành công!");
      setTitle("");
      setDate("");
      setContent("");
      setAuthor("");
      setTags("");
      setCategory("");
      setBanner("");
      setNumberComments("");
      setLinks("");
      navigate("/");
    } catch (error) {
      setMessage("Error creating blog: " + error.message);
    }
  };

  return (
    <div className="dashboard-container-main min-h-screen flex bg-white">
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>
      {contextHolder}
      <div
        className="col-span-1 md:col-span-4 p-6 dashboard-container"
        style={{ width: "100%" }}
      >
        <div
          className="transactions bg-white shadow-md rounded-lg p-7 shadow-md mt-6"
          style={{ width: "100%", height: "75vh" }}
        >
          <h2 className="text-2xl font-bold text-left mt-4 mb-6">
            Tạo bài viết mới
          </h2>
          {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề"
              ></input>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Nhập danh mục"
              ></input>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nhập tác giả"
              ></input>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Nhập thẻ"
              ></input>
              <input
                type="number"
                value={numberComments}
                onChange={(e) => setNumberComments(e.target.value)}
                placeholder="Nhập số bình luận"
              ></input>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Nhập ngày"
              ></input>
            </div>

            <input
              type="text"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              placeholder="Nhập đường dẫn"
            ></input>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung"
              rows="4"
              cols={50}
              className="border border-gray-300 rounded px-3 py-2"
              style={{ width: "100%", resize: "none" }}
            ></textarea>
            <div className="flex flex-col gap-2">
              <p>Tải lên hình ảnh (1 hình ảnh)</p>
              <input
                type="file"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded"
                multiple
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 text-left rounded"
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                left: "0",
                width: "fit-content",
              }}
            >
              Tạo bài viết mới
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
