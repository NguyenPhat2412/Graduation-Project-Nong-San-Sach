import { useEffect, useState } from "react";
import "./home.featuredProduct.css";
import ProductDetails from "../../Shop/ProductDetails/shop.productDetails";
const FeatureProduct = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch featured products data from database
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/products`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const displayedProducts = showAll
    ? featuredProducts
    : featuredProducts.slice(0, 5);
  return (
    <div className="featured-products">
      <div className="featured-products-header">
        <h3>Featured Products</h3>
        {featuredProducts.length > 5 && (
          <button
            className="view-all-button"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less " : "View All"}
            <span className="arrow">{showAll ? "▲" : "▼"}</span>
          </button>
        )}
      </div>
      <div className="product-list">
        {displayedProducts.map((product) => (
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
              <span className="product-price">${product.price.toFixed(2)}</span>
              {product.price_old && (
                <span className="product-price-old">${product.price_old}</span>
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
      <ProductDetails
        ProductDetails={selectedProduct}
        show={showDetails}
        onHide={() => setShowDetails(false)}
      />
    </div>
  );
};

export default FeatureProduct;
