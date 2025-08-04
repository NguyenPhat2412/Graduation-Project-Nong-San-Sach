import { useEffect, useState } from "react";
import "./home.recentlyView.css";
import ProductDetails from "../../Shop/ProductDetails/shop.productDetails";
const RecentlyViewedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  useEffect(() => {
    // get local storage
    const getRecentlyViewedProducts = async () => {
      try {
        const response = localStorage.getItem(`recentlyViewed`);

        if (response) {
          const data = JSON.parse(response);
          setRecentlyViewedProducts(data);
        }
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
      }
    };
    getRecentlyViewedProducts();
  }, []);

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  return (
    <div className="recently-viewed-products">
      {recentlyViewedProducts.length > 0 ? (
        <>
          <h3>Đã xem gần đây </h3>
          <div className="product-list">
            {recentlyViewedProducts.map((product) => (
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
                    ${product.price.toFixed(2)}
                  </span>
                  {product.price_old && (
                    <span className="product-price-old">
                      ${product.price_old}
                    </span>
                  )}
                  <div>
                    {Array.from({ length: product.rating }).map((_, index) => (
                      <span key={index}>⭐</span>
                    ))}
                  </div>
                </div>
                {product.discount && (
                  <span className="product-discount">
                    Sale {product.discount}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-recently-viewed">
          Chưa có sản phẩm nào được xem gần đây
        </div>
      )}

      <ProductDetails
        ProductDetails={selectedProduct}
        show={showDetails}
        onHide={() => setShowDetails(false)}
      />
    </div>
  );
};

export default RecentlyViewedProducts;
