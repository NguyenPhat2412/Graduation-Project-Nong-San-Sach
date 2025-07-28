import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/navbar";
import "./NewProduct.css";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [price_old, setPriceOld] = useState("");

  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();

  const { productId } = useParams();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/products/${productId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await res.json();
        console.log(data);
        if (data) {
          setProductName(data.product.name || "");
          setCategory(data.product.category || "");
          setImage(data.product.img || null);
          setMessage(data.product.message || "");
          setPrice(data.product.price || "");
          setRating(data.product.rating || 0);
          setDescription(data.product.description || "");
          setDiscount(data.product.discount || 0);
          setPriceOld(data.product.price_old || "");

          setErrors({});
        } else {
          console.error("No product data found for the given ID");
        }
      } catch (err) {
        console.error("Error when fetch product: ", err);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs
    if (!productName || !category || !image || !rating || !price) {
      setErrors({
        productName: !productName ? "Product name is required" : "",
        category: !category ? "Category is required" : "",
        price: !price ? "Price is required" : "",
        rating:
          rating < 0 || rating > 5 ? "Rating must be between 0 and 5" : "",
        images: !image ? "Image is required" : "",
        errors: "Please fill in all fields",

        image: !image ? "Image is required" : "",
      });
      return;
    }
    setErrors({});

    const updatedProduct = {
      name: productName,
      category: category,
      image: image ? URL.createObjectURL(image) : null,
    };

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/admin/product/edit-product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to add  product");
      }
      alert("Updated product successfully");
      navigator("/");
    } catch (err) {
      console.error("Error when update product", err);
      setMessage("Error when update product: " + err.message);
    }
  };

  return (
    <div className="dashboard-container-main min-h-screen flex bg-white">
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>
      <div
        className="col-span-1 md:col-span-4 p-6 dashboard-container"
        style={{ width: "100%" }}
      >
        <div
          className="transactions bg-white shadow-md rounded-lg p-7 shadow-md mt-6"
          style={{ width: "100%", height: "65vh" }}
        >
          <h2 className="text-2xl font-bold text-left mt-4 mb-6">
            Edit Product
          </h2>
          {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name"
              ></input>
              {errors.productName && (
                <p className="text-red-500 text-sm">{errors.productName}</p>
              )}

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
                placeholder="Enter Rating"
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
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <button
              className="text-white bg-blue-500 hover:bg-blue-600 text-left rounded"
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                left: "0",
                width: "fit-content",
              }}
              onClick={(e) => {
                handleSubmit(e);
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

export default EditProduct;
