import { useState } from "react";
import NavBar from "../../components/NavBar/navbar";
import "./NewProduct.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const NewProduct = () => {
  const [name, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [price_old, setPriceOld] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setImage(Array.from(e.target.files));
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message: "Notification",
      description: message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !category ||
      !image ||
      !errors ||
      !price ||
      rating < 0 ||
      rating > 5
    ) {
      setErrors({
        name: !name ? "Product name is required" : "",
        category: !category ? "Category is required" : "",

        price: !price ? "Price is required" : "",
        images: !image ? "Image is required" : "",
        errors: "Please fill in all fields",
      });

      return;
    }
    setErrors({});

    try {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("images", image[i]);
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
        `${import.meta.env.VITE_API_URL}/api/admin/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            category,
            price: price,
            rating: rating,
            description: description,
            discount: discount,
            price_old: price_old,
            img: imageUrl,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        openNotification("error", "Failed to create product");
        throw new Error(data.error || "Failed to create product");
      }
      openNotification("success", "Product created successfully!");
      setProductName("");
      setCategory("");
      setPrice("");
      setImage(null);
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      setMessage("Error creating product: " + error.message);
    }
  };

  return (
    <div className="dashboard-container-main min-h-screen flex bg-white">
      {contextHolder}
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>
      <div
        className="col-span-1 md:col-span-4 p-6 dashboard-container"
        style={{ width: "100%" }}
      >
        <div
          className="transactions bg-white shadow-md rounded-lg p-7 shadow-md mt-6"
          style={{ width: "100%", height: "75vh" }}
        >
          <h2 className="text-2xl font-bold text-left mt-4 mb-6">
            Add New Product
          </h2>
          {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name"
              ></input>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Category"
              ></input>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
              ></input>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="number"
                value={price_old}
                onChange={(e) => setPriceOld(e.target.value)}
                placeholder="Enter Old Price"
              ></input>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Enter Rating (0-5)"
              ></input>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              rows="4"
              cols={50}
              className="border border-gray-300 rounded px-3 py-2"
              style={{ width: "100%", resize: "none" }}
            ></textarea>

            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter Discount Percentage"
            ></input>
            <div className="flex flex-col gap-2">
              <p>Upload image (5 images)</p>
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
