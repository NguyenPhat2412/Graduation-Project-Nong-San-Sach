import { useEffect, useState } from "react";
import "./shop.listProduct.css";
import ProductDetails from "./ProductDetails/shop.productDetails";
import { useCategory } from "../../UseContext/CategoryContext";
import { Pagination } from "antd";
const ListProduct = () => {
  const [productList, setProductList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedCategory, minPrice, maxPrice, selectedRating } =
    useCategory();
  const pageSize = 20;
  const totalProducts = productList.length;
  const paginatedProducts = productList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch data from API
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = selectedCategory
          ? `${import.meta.env.VITE_DATABASE_URL}/api/client/products/category/${selectedCategory}`
          : `${import.meta.env.VITE_DATABASE_URL}/api/client/products`;
        const res = await fetch(response);
        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await res.json();
        setProductList(data);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, [selectedCategory]);

  // fetch search price
  useEffect(() => {
    const fetchPriceFilteredProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/products/price/minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products by price");
        }
        const data = await response.json();
        setProductList(data);
      } catch (error) {
        console.error("Error fetching products by price:", error);
      }
    };
    fetchPriceFilteredProducts();
  }, [minPrice, maxPrice]);

  // fetch search rating
  useEffect(() => {
    const fetchRatingFilteredProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/products/rating/${selectedRating}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products by rating");
        }
        const data = await response.json();
        setProductList(data);
      } catch (error) {
        console.error("Error fetching products by rating:", error);
      }
    };
    if (selectedRating) {
      fetchRatingFilteredProducts();
    }
  }, [selectedRating]);

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };
  return (
    <div>
      <div className="product-list">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-image">
              <img
                src={`${import.meta.env.VITE_DATABASE_URL}${product.img}`}
                alt={product.name}
                onClick={() => handleShowDetails(product)}
              />
            </div>
            <div className="product-details">
              <div className="product-name">{product.name}</div>
              <span className="product-price">
                {product.price.toFixed(2)} VND
              </span>
              {product.price_old && (
                <span className="product-price-old">
                  {product.price_old} VND
                </span>
              )}
              <div>
                {Array.from({ length: product.rating }).map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </div>
            </div>
            {product.discount && (
              <span className="product-discount">Sale {product.discount}%</span>
            )}
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalProducts}
          onChange={handlePageChange}
        />
      </div>
      <ProductDetails
        show={showDetails}
        onHide={() => setShowDetails(false)}
        ProductDetails={selectedProduct}
      />
    </div>
  );
};

export default ListProduct;
